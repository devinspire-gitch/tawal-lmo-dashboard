import React, { Component, Fragment } from "react";
import { Row, Table, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { AreaChart } from "../../../components/charts";
import { ThemeColors } from "../../../helpers/ThemeColors";

const colors = ThemeColors();

const areaChartData = {
  labels: [
    "1-Apr",
    "8-Apr",
    "15-Apr",
    "22-Apr",
    "6-May",
    "13-May",
    "20-May",
    "27-May",
    "3-Jun",
    "10-Jun",
    "17-Jun",
    "24-Jun",
    "8-Jul",
    "15-Jul",
    "22-Jul",
    "29-Jul",
    "5-Aug",
    "12-Aug",
    "19-Aug",
    "26-Aug"
  ],
  datasets: [
    {
      label: "Autonomous TAWL plan achieved progress (% of total plan)",
      data: [0, 0, 3, 4, 7, 9, 10, 11, 13, 15, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: colors.themeColor1,
      pointBackgroundColor: colors.foregroundColor,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.foregroundColor,
      pointRadius: 4,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      fill: true,
      borderWidth: 2,
      backgroundColor: colors.themeColor1_10
    },
    {
      label: "Autonomous TAWL plan target progress (% of total plan)",
      data: [
        0,
        0,
        3,
        4,
        7,
        9,
        13,
        17,
        20,
        25,
        27,
        33,
        37,
        44,
        50,
        60,
        70,
        75,
        80,
        83
      ],
      borderColor: colors.themeColor2,
      pointBackgroundColor: colors.foregroundColor,
      pointBorderColor: colors.themeColor2,
      pointHoverBackgroundColor: colors.themeColor2,
      pointHoverBorderColor: colors.foregroundColor,
      pointRadius: 2,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      fill: true,
      borderWidth: 2,
      backgroundColor: "transparent"
    }
  ]
};

const planProgress = [
  {
    workstream: "Operations",
    achieved: 16,
    target: 32,
    actions: {
      total: 143,
      completed: 15,
      ongoing: 11,
      ongoingRisks: 0,
      delayedStart: 26,
      delayed: 15,
      notStarted: 76
    }
  },
  {
    workstream: "Network",
    achieved: 15,
    target: 31,
    actions: {
      total: 83,
      completed: 15,
      ongoing: 11,
      ongoingRisks: 0,
      delayedStart: 26,
      delayed: 6,
      notStarted: 45
    }
  },
  {
    workstream: "PPC",
    achieved: 2,
    target: 15,
    actions: {
      total: 62,
      completed: 2,
      ongoing: 1,
      ongoingRisks: 0,
      delayedStart: 12,
      delayed: 9,
      notStarted: 38
    }
  },
  {
    workstream: "Technology & Innovation",
    achieved: 27,
    target: 36,
    actions: {
      total: 286,
      completed: 31,
      ongoing: 6,
      ongoingRisks: 0,
      delayedStart: 19,
      delayed: 14,
      notStarted: 216
    }
  },
  {
    workstream: "Commercial",
    achieved: 23,
    target: 44,
    actions: {
      total: 154,
      completed: 35,
      ongoing: 71,
      ongoingRisks: 0,
      delayedStart: 0,
      delayed: 48,
      notStarted: 0
    }
  },
  {
    workstream: "Communications",
    achieved: 21,
    target: 95,
    actions: {
      total: 22,
      completed: 2,
      ongoing: 8,
      ongoingRisks: 0,
      delayedStart: 0,
      delayed: 12,
      notStarted: 0
    }
  },
  {
    workstream: "Finance",
    achieved: 68,
    target: 74,
    actions: {
      total: 48,
      completed: 26,
      ongoing: 1,
      ongoingRisks: 0,
      delayedStart: 3,
      delayed: 5,
      notStarted: 13
    }
  },
  {
    workstream: "Procurement",
    achieved: 46,
    target: 58,
    actions: {
      total: 51,
      completed: 23,
      ongoing: 1,
      ongoingRisks: 0,
      delayedStart: 0,
      delayed: 6,
      notStarted: 21
    }
  },
  {
    workstream: "Site Lease Management",
    achieved: 64,
    target: 83,
    actions: {
      total: 48,
      completed: 24,
      ongoing: 0,
      ongoingRisks: 0,
      delayedStart: 1,
      delayed: 12,
      notStarted: 11
    }
  },
  {
    workstream: "Strategy & Governance",
    achieved: 30,
    target: 42,
    actions: {
      total: 77,
      completed: 21,
      ongoing: 4,
      ongoingRisks: 0,
      delayedStart: 8,
      delayed: 8,
      notStarted: 36
    }
  },
  {
    workstream: "HR",
    achieved: 17,
    target: 38,
    actions: {
      total: 79,
      completed: 9,
      ongoing: 3,
      ongoingRisks: 0,
      delayedStart: 6,
      delayed: 16,
      notStarted: 45
    }
  }
];

export default class OverallProgress extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Overall Progress" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx md="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>
                  Plan Progress
                  <small className="text-muted mx-2">
                    (in % of total actions)
                  </small>
                </CardTitle>
                <div className="chart-container progress-view-chart">
                  <AreaChart shadow data={areaChartData} />
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row>
          <Colxx md="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>Autonomous Plan Progress</CardTitle>
                <Table>
                  <thead>
                    <tr className="text-secondary bg-light">
                      <th>Workstream</th>
                      <th>Achieved to date</th>
                      <th className="border-right">Target to date</th>
                      <th className="border-right">Total actions</th>
                      <th>Completed</th>
                      <th>On Going</th>
                      <th>Ongoing w/ Risk</th>
                      <th>Delayed Start</th>
                      <th>Delayed</th>
                      <th>Not Started</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planProgress.map(item => (
                      <tr key={item.workstream}>
                        <th scope="row">{item.workstream}</th>
                        <td
                          className={`text-center ${
                            item.achieved < item.target * 0.8
                              ? "bg-danger text-white"
                              : item.achieved < item.target
                              ? "bg-warning"
                              : "bg-success text-white"
                          }`}
                        >
                          {`${item.achieved}%`}
                        </td>
                        <td className="text-center border-right">
                          {`${item.target}%`}
                        </td>
                        <th
                          className={`text-center border-right ${
                            item.actions.total === 0 ? "text-muted" : ""
                          }`}
                        >
                          {item.actions.total}
                        </th>
                        <td
                          className={`text-center ${
                            item.actions.completed === 0 ? "text-muted" : ""
                          }`}
                        >
                          {item.actions.completed}
                        </td>
                        <td
                          className={`text-center ${
                            item.actions.ongoing === 0 ? "text-muted" : ""
                          }`}
                        >
                          {item.actions.ongoing}
                        </td>
                        <td
                          className={`text-center ${
                            item.actions.ongoingRisks === 0 ? "text-muted" : ""
                          }`}
                        >
                          {item.actions.ongoingRisks}
                        </td>
                        <td
                          className={`text-center ${
                            item.actions.delayedStart === 0 ? "text-muted" : ""
                          }`}
                        >
                          {item.actions.delayedStart}
                        </td>
                        <td
                          className={`text-center ${
                            item.actions.delayed === 0 ? "text-muted" : ""
                          }`}
                        >
                          {item.actions.delayed}
                        </td>
                        <td className="text-center text-muted">
                          {item.actions.notStarted}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="text-white bg-secondary">
                    <th>Autonomous TAWAL</th>
                    <th className="text-center bg-danger text-white">24%</th>
                    <th className="text-center border-right">40%</th>
                    <th className="text-center border-right">1053</th>
                    <th className="text-center">206</th>
                    <th className="text-center">111</th>
                    <th className="text-center">0</th>
                    <th className="text-center">84</th>
                    <th className="text-center">151</th>
                    <th className="text-center">501</th>
                  </tfoot>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
