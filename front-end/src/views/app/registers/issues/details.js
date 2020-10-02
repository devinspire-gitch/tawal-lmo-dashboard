import React, { Component, Fragment } from "react";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { Row, Col, Badge, Card, CardBody } from "reactstrap";
import moment from "moment";
import { PRIORITY, ISSUE_STATUS } from "common/constants";
import {
  Colxx,
  Separator
} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import API from "../../../../helpers/API";

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

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      resourceName: "issues",
      redirectTo: null,
      resource: {},
      isLoading: true
    };
  }

  async loadResource() {
    const { match } = this.props;
    const { resourceName } = this.state;
    try {
      const response = await this.API.get(
        `/${resourceName}/${match.params.id}`,
        {
          params: {
            filter: {
              include: ["type", "workstream", "substream"]
            }
          }
        }
      );
      this.setState({
        resource: response.data,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        redirectTo: "/error",
        isLoading: false
      });
    }
  }

  componentDidMount() {
    this.loadResource();
  }

  render() {
    const { resource, redirectTo, isLoading } = this.state;
    const { match } = this.props;

    if (isLoading) return <div className="loading" />;

    if (redirectTo) return <Redirect to={redirectTo} />;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              {(resource && resource.type && `${resource.type.name} Details`) ||
                "Risk/Issue Details"}
            </h1>
            <div className="text-zero top-right-button-container">
              <NavLink
                to={`../update/${match.params.id}`}
                className="btn btn-primary btn-lg top-right-button mr-1 text-uppercase"
              >
                Edit
              </NavLink>
              <NavLink
                to={"../list"}
                className="btn btn-secondary btn-lg top-right-button mr-1 text-uppercase"
              >
                Back to List
              </NavLink>
            </div>
            <Breadcrumb match={match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {resource && (
          <Row>
            <Colxx xxs="12" lg="4" className="mb-4">
              <Card className="mb-4">
                <CardBody>
                  <p className="list-item-heading mb-4 font-weight-bold">
                    Summary
                  </p>

                  <p className="text-muted text-small mb-2">
                    {(resource.type && `${resource.type.name} #`) ||
                      "Risk/Issue #"}
                  </p>
                  <p className="mb-3">{resource.code}</p>

                  <p className="text-muted text-small mb-2">Activity #</p>
                  <p className="mb-3">
                    {resource.activity || "No activity related"}
                  </p>

                  <p className="text-muted text-small mb-2">Workstream</p>
                  <p className="mb-3">
                    {(resource.workstream && resource.workstream.name) ||
                      "(Not Set)"}
                  </p>

                  <p className="text-muted text-small mb-2">Substream</p>
                  <p className="mb-0">
                    {(resource.substream && resource.substream.name) ||
                      "(Not Set)"}
                  </p>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4" className="mb-4">
              <Card>
                <CardBody>
                  <p className="list-item-heading mb-4 font-weight-bold d-flex justify-content-between">
                    {(resource.type && `${resource.type.name}`) || "Risk/Issue"}
                    <Badge
                      color={getPriorityColor(resource.priorityId)}
                      pill
                      className="text-uppercase"
                    >
                      {getNameFromConstant(PRIORITY, resource.priorityId)}
                    </Badge>
                  </p>
                  <p className="list-item-heading mb-4">
                    {resource.description}
                  </p>

                  <p className="text-muted text-small mb-2">
                    Mitigation Actions
                  </p>
                  <p className="mb-3">
                    {resource.mitigationActions || "(Not Set)"}
                  </p>

                  <p className="text-muted text-small mb-2">
                    Person Responsible
                  </p>
                  <p className="mb-3">
                    {resource.personResponsible || "(Not Set)"}
                  </p>

                  <p className="text-muted text-small mb-2">Comments</p>
                  <p
                    className="mb-0"
                    dangerouslySetInnerHTML={{
                      __html: resource.comments || "(Not Set)"
                    }}
                  />
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4" className="mb-4">
              <Card>
                <CardBody>
                  <p className="list-item-heading mb-4 font-weight-bold d-flex justify-content-between">
                    Status
                    <Badge
                      color={getStatusColor(resource.statusId)}
                      pill
                      className="text-uppercase"
                    >
                      {getNameFromConstant(ISSUE_STATUS, resource.statusId)}
                    </Badge>
                  </p>
                  <Row>
                    <Col>
                      <p className="text-muted text-small mb-2">Due Date</p>
                      <p className="mb-3">
                        {(resource.dueDate &&
                          moment(resource.dueDate).format("L")) ||
                          "(Not Set)"}
                      </p>
                    </Col>
                    <Col>
                      <p className="text-muted text-small mb-2">
                        Completion Date
                      </p>
                      <p className="mb-3">
                        {(resource.completionDate &&
                          moment(resource.completionDate).format("L")) ||
                          "(Not Set)"}
                      </p>
                    </Col>
                  </Row>

                  <p className="text-muted text-small mb-2">Issue Date</p>
                  <p className="mb-0">
                    {(resource.createdAt &&
                      moment(resource.createdAt).format("L")) ||
                      "(Not Set)"}
                  </p>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        )}
      </Fragment>
    );
  }
}

export default withRouter(DetailsPage);
