import React, { Component, Fragment } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import GradientWithRadialProgressCard from "../../../components/cards/GradientWithRadialProgressCard";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { RadarChart } from "../../../components/charts";
import { ThemeColors } from "../../../helpers/ThemeColors";

const colors = ThemeColors();

const radarChartData = {
  labels: [
    "People",
    "Processes",
    "Tools",
    "Governance",
    "Performance",
    "Culture"
  ],
  datasets: [
    {
      label: "Actual",
      borderWidth: 2,
      pointBackgroundColor: colors.themeColor2,
      borderColor: colors.themeColor2,
      backgroundColor: colors.themeColor2_10,
      data: [0.1, 0.2, 0.3, 0.7, 0.5, 0]
    },
    {
      label: "Current Target",
      borderWidth: 2,
      borderDash: [5, 5],
      pointBackgroundColor: colors.themeColor1,
      borderColor: colors.themeColor1,
      backgroundColor: colors.themeColor1_10,
      data: [0.5, 0.3, 0.5, 0.9, 0.5, 0]
    },
    {
      label: "Final Target",
      borderWidth: 1.5,
      pointBackgroundColor: colors.themeColor3,
      borderColor: colors.themeColor3,
      backgroundColor: colors.themeColor3_10,
      data: [1, 1, 1, 1, 1, 1]
    }
  ]
};

export default class BusinessView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Business View" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx md="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>Operating Model</CardTitle>
                <div className="chart-container business-view-chart">
                  <RadarChart shadow data={radarChartData} />
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx md="12" className="mb-4">
            <h2 className="mb-3">Value Chain</h2>
            <Row>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="Strategy"
                  detail="T: 14%"
                  percent={11}
                  progressText="11%"
                  className="shadow-sm"
                />
              </Colxx>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="Commercial Enablement"
                  detail="T: 42%"
                  percent={19}
                  progressText="19%"
                  className="shadow-sm"
                />
              </Colxx>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="Sales & Order Intake"
                  detail="T: 51%"
                  percent={31}
                  progressText="31%"
                  className="shadow-sm"
                />
              </Colxx>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="Network Design"
                  detail="T: 47%"
                  percent={27}
                  progressText="27%"
                  className="shadow-sm"
                />
              </Colxx>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="Order Delivery"
                  detail="T: 50%"
                  percent={24}
                  progressText="24%"
                  className="shadow-sm"
                />
              </Colxx>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="O&M"
                  detail="T: 49%"
                  percent={37}
                  progressText="37%"
                  className="shadow-sm"
                />
              </Colxx>
              <Colxx xs="6" md="4" className="mb-4">
                <GradientWithRadialProgressCard
                  title="Billing"
                  detail="T: 69%"
                  percent={45}
                  progressText="45%"
                  className="shadow-sm"
                />
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
