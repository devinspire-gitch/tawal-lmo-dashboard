import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import coo from "./coo";
import cco from "./cco";
import cfo from "./cfo";
import csgo from "./csgo";
import chro from "./chro";

const Reports = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/csgo`} />
      <Route path={`${match.url}/coo`} component={coo} />
      <Route path={`${match.url}/cco`} component={cco} />
      <Route path={`${match.url}/cfo`} component={cfo} />
      <Route path={`${match.url}/csgo`} component={csgo} />
      <Route path={`${match.url}/chro`} component={chro} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Reports;
