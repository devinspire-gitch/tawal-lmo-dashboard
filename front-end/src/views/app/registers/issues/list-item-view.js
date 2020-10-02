import React from "react";
import moment from "moment";
import { Card, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { PRIORITY, ISSUE_STATUS } from "common/constants";
import { Colxx } from "../../../../components/common/CustomBootstrap";

const getNameFromConstant = (constant, id) =>
  Object.keys(constant)
    .map(key => constant[key])
    .find(item => item.id === id).name;

const getPriorityColor = priorityId => {
  switch (priorityId) {
    case PRIORITY.HIGH.id:
      return "danger";
    case PRIORITY.MEDIUM.id:
      return "warning";
    case PRIORITY.LOW.id:
      return "info";
    default:
      return "light";
  }
};

const getStatusColor = statusId => {
  switch (statusId) {
    case ISSUE_STATUS.ON_GOING.id:
      return "info";
    case ISSUE_STATUS.CLOSED.id:
      return "success";
    case ISSUE_STATUS.DELAYED.id:
      return "danger";
    default:
      return "light";
  }
};

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
                  {item.activity || "No activity related"}
                </span>
              </p>
              <p className="list-item-heading mb-1 truncate">
                {item.description}
              </p>
              <div className="mt-2 text-uppercase">
                <Badge color={getPriorityColor(item.priorityId)} pill>
                  {getNameFromConstant(PRIORITY, item.priorityId)}
                </Badge>
                {item.type && (
                  <Badge color="light" pill className="mx-1">
                    {item.type.name}
                  </Badge>
                )}
              </div>
            </NavLink>
            <p className="mb-1 text-muted text-small w-30 w-sm-100">
              {item.workstream ? item.workstream.name : "Workstream N/A"}
              <span className="substream-indicator">
                {item.substream ? item.substream.name : "Substream N/A"}
              </span>
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100 text-center">
              <span className="d-block font-weight-bold">Responsible</span>
              {item.responsible || "N/A"}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100 text-center">
              <span className="d-block font-weight-bold">
                {item.completedDate ? "Completed Date" : "Due Date"}
              </span>
              {((item.completedDate || item.dueDate) &&
                moment(item.completedDate || item.dueDate).format("L")) ||
                "N/A"}
            </p>
            <div className="w-15 w-sm-100 list-item-heading text-uppercase d-flex justify-content-end">
              <Badge color={getStatusColor(item.statusId)} pill>
                {(item.statusId &&
                  getNameFromConstant(ISSUE_STATUS, item.statusId)) ||
                  "N/A"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ActionListView);
