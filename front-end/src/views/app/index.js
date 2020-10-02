import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import registers from "./registers";
import reports from "./reports";
import spotlights from "./spotlights";
import welcome from "./welcome";
import gogo from "./gogo";
import secondMenu from "./second-menu";
import blankPage from "./blank-page";

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/welcome`} />
          <Route path={`${match.url}/registers`} component={registers} />
          <Route path={`${match.url}/reports`} component={reports} />
          <Route path={`${match.url}/spotlights`} component={spotlights} />
          <Route path={`${match.url}/welcome`} component={welcome} />
          <Route path={`${match.url}/gogo`} component={gogo} />
          <Route path={`${match.url}/second-menu`} component={secondMenu} />
          <Route path={`${match.url}/blank-page`} component={blankPage} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
