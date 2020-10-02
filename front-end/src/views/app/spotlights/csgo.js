import React, { Component, Fragment } from "react";
import { Row, Table, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

const spotlightData = [
  {
    name: "Strategy & Governance",
    substreams: [
      {
        name: "Develop and Monitor Tawal's Corporate Strategy",
        actual: 11,
        target: 16,
        lastKeyAchievements:
          "- Top 20 Priorities for CS developped<br/>- Storyline for Corp. Strategy under draft<br/>- Full storyline under development. Will be ready by end of week",
        keyMisses: "- 2 weeks late on review with CxOs ",
        nextSteps:
          "- Internal review to be completed this week<br/>- Review with CxOs next week",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Develop and Implement Efficiency Strategy",
        actual: 17,
        target: 36,
        lastKeyAchievements:
          "Aligned on top 4 Efficiencies programs from Offsite<br/>Conducted initial deep dive sessions with Ops, NW and Site Lease teams<br/>Conducted first session with the Commercial team",
        keyMisses: "",
        nextSteps: "Finalize all 4 Project Charters this week ",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Set Up Quality and Risk Function ",
        actual: 40,
        target: 59,
        lastKeyAchievements:
          "Processes and Policies - Baseline and dashboard of existing processes (186) and policies (60) to be developped established ",
        keyMisses: "- met with COO and CFO on priority list ",
        nextSteps:
          "Conduct remaining meeting with CHRO and CCO to rationalize processes and policies at appropriate level<br/>Emphasize that the responsibility to draft  process and policy lie with the functions, Q&A team to support in quality assurance",
        keyRisks:
          "Lack of resources to complete process documentation across all the functions ",
        mitigationPlan: ""
      },
      {
        name: "Develop Corporate Governance ",
        actual: 75,
        target: 54,
        lastKeyAchievements:
          "- Board Charter shared with the CEO. Comments being incorporated<br/>- AM being automated on ERP",
        keyMisses: "",
        nextSteps:
          "- Gain CEO sign off on Board Charter<br/>- Policy documents and Authority Matrix documents to be re-shared across functions",
        keyRisks: "",
        mitigationPlan: ""
      }
    ],
    overall: {
      actual: 30,
      target: 42
    }
  }
];

export default class SpotlightView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="CSGO Spotlight" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {spotlightData.map(workstream => (
          <Row>
            <Colxx md="12">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>{workstream.name}</CardTitle>
                  <Table responsive>
                    <thead>
                      <tr className="text-secondary bg-light">
                        <th>Substream</th>
                        <th>Actual</th>
                        <th>Target</th>
                        <th>Last Key Achievements</th>
                        <th>Key Misses</th>
                        <th>Next Steps</th>
                        <th>Key Risks</th>
                        <th>Mitigation Plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workstream.substreams.map(item => (
                        <tr key={item.name}>
                          <th scope="row">{item.name}</th>
                          <td
                            className={`text-center ${
                              item.actual < item.target * 0.8
                                ? "bg-danger text-white"
                                : item.actual < item.target
                                ? "bg-warning"
                                : "bg-success text-white"
                            }`}
                          >
                            {`${item.actual}%`}
                          </td>
                          <td className="text-center">{`${item.target}%`}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item.lastKeyAchievements
                            }}
                          />
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item.keyMisses
                            }}
                          />
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item.nextSteps
                            }}
                          />
                          <td
                            className="text-danger"
                            dangerouslySetInnerHTML={{
                              __html: item.keyRisks
                            }}
                          />
                          <td
                            className="text-danger"
                            dangerouslySetInnerHTML={{
                              __html: item.mitigationPlan
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-light">
                      <th>Overall</th>
                      <th
                        className={`text-center ${
                          workstream.overall.actual <
                          workstream.overall.target * 0.8
                            ? "bg-danger text-white"
                            : workstream.overall.actual <
                              workstream.overall.target
                            ? "bg-warning"
                            : "bg-success text-white"
                        }`}
                      >
                        {`${workstream.overall.actual}%`}
                      </th>
                      <th className="text-center">
                        {`${workstream.overall.target}%`}
                      </th>
                    </tfoot>
                  </Table>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        ))}
      </Fragment>
    );
  }
}
