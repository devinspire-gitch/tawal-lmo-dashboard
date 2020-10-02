import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import list from "./list";
import form from "./form";
import details from "./details";

const PageIndex = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={list} />
      <Route path={`${match.url}/create`} component={form} />
      <Route path={`${match.url}/update/:id`} component={form} />
      <Route path={`${match.url}/details/:id`} component={details} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default PageIndex;
