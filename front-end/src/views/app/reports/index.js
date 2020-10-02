import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import businessView from "./business-view";
import milestones from "./milestones";
import progress from "./progress";

const Reports = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/business-view`}
      />
      <Route path={`${match.url}/business-view`} component={businessView} />
      <Route path={`${match.url}/milestones`} component={milestones} />
      <Route path={`${match.url}/progress`} component={progress} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Reports;
