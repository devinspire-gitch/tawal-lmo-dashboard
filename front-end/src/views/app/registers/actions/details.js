import React, { Component, Fragment } from "react";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { Row, Col, Badge, Card, CardBody } from "reactstrap";
import moment from "moment";
import {
  Colxx,
  Separator
} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import RadialProgressCard from "../../../../components/cards/RadialProgressCard";
import API from "../../../../helpers/API";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      resourceName: "actions",
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
              include: [
                "chief",
                "workstream",
                "substream",
                "operatingModel",
                "valueBlocks"
              ]
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
            <h1>{(resource && resource.code) || "Action Details"}</h1>
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

                  <p className="text-muted text-small mb-2">Action #</p>
                  <p className="mb-3">{resource.code}</p>

                  <p className="text-muted text-small mb-2">Chief</p>
                  <p className="mb-3">
                    {(resource.chief && resource.chief.name) || "(Not Set)"}
                  </p>

                  <p className="text-muted text-small mb-2">Workstream</p>
                  <p className="mb-3">
                    {(resource.workstream && resource.workstream.name) ||
                      "(Not Set)"}
                  </p>

                  <p className="text-muted text-small mb-2">Substream</p>
                  <p className="mb-3">
                    {(resource.substream && resource.substream.name) ||
                      "(Not Set)"}
                  </p>

                  <p className="text-muted text-small mb-2">Activity</p>
                  <p className="mb-3">{resource.activity || "(Not Set)"}</p>

                  <p className="text-muted text-small mb-2">Value Blocks</p>
                  <div className="mb-3">
                    {resource.valueBlocks.map(item => [
                      <p className="d-sm-inline-block mb-1" key={item.id}>
                        <Badge
                          color="secondary"
                          pill
                          className="text-uppercase"
                        >
                          {item.name}
                        </Badge>
                      </p>,
                      <p
                        className="d-sm-inline-block mb-1 mr-1"
                        key={`${item.id}-separator`}
                      />
                    ])}
                    {!resource.valueBlocks.length && "(Not Set)"}
                  </div>

                  <Row>
                    <Col>
                      <p className="text-muted text-small mb-2">Predecessor</p>
                      <p className="mb-0">
                        {resource.predecessor || "(Not Set)"}
                      </p>
                    </Col>
                    <Col>
                      <p className="text-muted text-small mb-2">Successor</p>
                      <p className="mb-0">
                        {resource.successor || "(Not Set)"}
                      </p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4" className="mb-4">
              <Card>
                <CardBody>
                  <p className="list-item-heading mb-4 font-weight-bold d-flex justify-content-between">
                    Action
                    {/* <Badge color="success" pill className="text-uppercase">
                      Completed
                    </Badge> */}
                  </p>
                  <p className="list-item-heading mb-4">{resource.action}</p>

                  <p className="text-muted text-small mb-2">Deliverable</p>
                  <p className="mb-3">{resource.deliverable || "(Not Set)"}</p>

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
                <hr className="m-0" />
                <CardBody>
                  <p className="text-muted text-small mb-2">Risks and Issues</p>
                  <p className="mb-0">
                    {resource.risksAndIssues || "(Not Set)"}
                  </p>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="12" lg="4" className="mb-4">
              <Card>
                <RadialProgressCard
                  className="shadow-none"
                  title="Actual Progress"
                  percent={resource.actionActualProgress}
                />
                {/* <RadialProgressCard
                  className="shadow-none"
                  title="Target Progress"
                  percent={resource.actionActualProgress}
                /> */}

                <hr className="m-0" />

                <CardBody>
                  <Row>
                    <Col>
                      <p className="text-muted text-small mb-2">
                        Action Start Date
                      </p>
                      <p className="mb-3">
                        {(resource.actionStartDate &&
                          moment(resource.actionStartDate).format("L")) ||
                          "(Not Set)"}
                      </p>
                    </Col>
                    <Col>
                      <p className="text-muted text-small mb-2">
                        Baseline End Date
                      </p>
                      <p className="mb-3">
                        {(resource.baselineEndDate &&
                          moment(resource.baselineEndDate).format("L")) ||
                          "(Not Set)"}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="text-muted text-small mb-2">
                        Actual Start Date
                      </p>
                      <p className="mb-3">
                        {(resource.actualStartDate &&
                          moment(resource.actualStartDate).format("L")) ||
                          "(Not Set)"}
                      </p>
                    </Col>
                    <Col>
                      <p className="text-muted text-small mb-2">
                        Updated End Date
                      </p>
                      <p className="mb-3">
                        {(resource.updatedEndDate &&
                          moment(resource.updatedEndDate).format("L")) ||
                          "(Not Set)"}
                      </p>
                    </Col>
                  </Row>

                  <p className="text-muted text-small mb-2">
                    Action Realization Date
                  </p>
                  <p className="mb-0">
                    {(resource.actionRealizationDate &&
                      moment(resource.actionRealizationDate).format("L")) ||
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
