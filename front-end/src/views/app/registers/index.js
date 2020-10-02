import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import actions from "./actions";
import issues from "./issues";

const Registers = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/actions`} />
      <Route path={`${match.url}/actions`} component={actions} />
      <Route path={`${match.url}/issues`} component={issues} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Registers;
