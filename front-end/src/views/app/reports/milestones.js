import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import CircularProgressbar from "react-circular-progressbar";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { BarChart } from "../../../components/charts";
import IconCard from "../../../components/cards/IconCard";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { ThemeColors } from "../../../helpers/ThemeColors";

const colors = ThemeColors();

const barChartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Cakes",
      borderColor: colors.themeColor1,
      backgroundColor: colors.themeColor1_10,
      data: [456, 479, 324, 569, 702, 600],
      borderWidth: 2
    },
    {
      label: "Desserts",
      borderColor: colors.themeColor2,
      backgroundColor: colors.themeColor2_10,
      data: [364, 504, 605, 400, 345, 320],
      borderWidth: 2
    }
  ]
};

export default class MilestonesView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Launch Milestones" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        {/* Cards */}
        <Row className="icon-cards-row mb-3">
          <Colxx xs="6" md="3">
            <IconCard
              title="Overall Progress"
              icon="iconsminds-check"
              value={"24%"}
              className="mb-2"
            />
          </Colxx>
          <Colxx xs="6" md="3">
            <IconCard
              title="Days Until D-0+6 Soft Launch"
              icon="iconsminds-calendar-1"
              value={67}
              className="mb-2"
            />
          </Colxx>
          <Colxx xs="6" md="3">
            <IconCard
              title="Days Until Autonomous"
              icon="iconsminds-communication-tower-2"
              value={250}
              className="mb-2"
            />
          </Colxx>
          <Colxx xs="6" md="3">
            <IconCard
              title="Recruitment Progress"
              icon="iconsminds-male-female"
              value={"93 / 272"}
              className="mb-2"
            />
          </Colxx>
        </Row>

        <Row>
          <Colxx md="5" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>High Priority</CardTitle>

                <Row>
                  <Col md="4">TODO</Col>
                  <Col md="8">TODO</Col>
                </Row>
              </CardBody>
            </Card>
          </Colxx>

          <Colxx md="7" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>Key Milestones</CardTitle>

                <div className="d-flex justify-content-between align-items-end">
                  <CardTitle className="mb-0 flex-fill">
                    Major Agreements
                  </CardTitle>
                  <div className="progress-bar-circle mx-4">
                    <div className="text-center font-weight-bold mb-1">
                      Actual
                    </div>
                    <CircularProgressbar
                      strokeWidth={5}
                      percentage={48}
                      text={`48%`}
                    />
                  </div>
                  <div className="progress-bar-circle">
                    <div className="text-center font-weight-bold mb-1">
                      Target
                    </div>
                    <CircularProgressbar
                      strokeWidth={5}
                      percentage={48}
                      text={`48%`}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row>
          <Colxx md="12">
            <Card>
              <CardBody>
                <div className="chart-container business-view-chart">
                  <BarChart shadow horizontal data={barChartData} />
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
