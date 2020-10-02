import React from "react";
import moment from "moment";
import { Card } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import CircularProgressbar from "react-circular-progressbar";
import { Colxx } from "../../../../components/common/CustomBootstrap";

const ActionListView = ({ item }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <Card className={classnames("d-flex flex-row")}>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={`./details/${item.id}`} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate text-small">
                <span className="font-weight-bold">{item.code}</span>
                <span className="text-muted">
                  {" - "}
                  {item.activity}
                </span>
              </p>
              <p className="list-item-heading mb-1">{item.action}</p>
            </NavLink>
            <p className="mb-1 text-muted text-small w-30 w-sm-100">
              {item.workstream ? item.workstream.name : "Workstream N/A"}
              <span className="substream-indicator">
                {item.substream ? item.substream.name : "Substream N/A"}
              </span>
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100 text-center">
              <span className="d-block font-weight-bold">
                {item.actualStartDate ? "Actual Start Date" : "Start Date"}
              </span>
              {((item.actualStartDate || item.actionStartDate) &&
                moment(item.actualStartDate || item.actionStartDate).format(
                  "L"
                )) ||
                "N/A"}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100 text-center">
              <span className="d-block font-weight-bold">
                {item.updatedEndDate ? "Updated End Date" : "End Date"}
              </span>
              {((item.updatedEndDate || item.baselineEndDate) &&
                moment(item.updatedEndDate || item.baselineEndDate).format(
                  "L"
                )) ||
                "N/A"}
            </p>
            <div className="progress-bar-circle align-self-center">
              <CircularProgressbar
                strokeWidth={4}
                percentage={item.actionActualProgress}
                text={`${item.actionActualProgress}%`}
              />
            </div>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ActionListView);
