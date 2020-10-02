import React, { Component, Fragment } from "react";
import { Row, Table, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

const spotlightData = [
  {
    name: "Finance",
    substreams: [
      {
        name: "Develop Finance Organization ",
        actual: 87,
        target: 100,
        lastKeyAchievements: "",
        keyMisses:
          "- Organization design pending signed off on organization structure and functional statements<br/>- Job descriptions not received ",
        nextSteps:
          "- Approve organization design and job descriptions and expedite any recruitment activities ",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Develop Finance Processes, Policies, Tools ",
        actual: 57,
        target: 54,
        lastKeyAchievements: "- Processes: Kick off processes exercise ",
        keyMisses: "- Appoint external auditor",
        nextSteps:
          "- Processes: Q&R to review and provide comments<br/>- Audit Company:Pass BoD resolution by circulation to get approval for the selection of BDO",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Develop Financial Monitoring and Reporting ",
        actual: 83,
        target: 90,
        lastKeyAchievements:
          "- Financial Dashboards reviewed<br/>- Launched financial reporting for Q2 ",
        keyMisses: "",
        nextSteps:
          "- Financial Reporting Q2: Engage Auditors and prepare financial report ",
        keyRisks: "",
        mitigationPlan: ""
      }
    ],
    overall: {
      actual: 68,
      target: 74
    }
  },
  {
    name: "Procurement",
    substreams: [
      {
        name: "Develop Procurement Organization ",
        actual: 91,
        target: 100,
        lastKeyAchievements: "",
        keyMisses:
          "- Organization design pending signed off on organization structure and functional statements<br/>- Job descriptions not received ",
        nextSteps:
          "- Approve organization design and job descriptions and expedite any recruitment activities ",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Develop Procurement Processes, Policies, Tools ",
        actual: 44,
        target: 74,
        lastKeyAchievements: "- Processes: Kick off processes exercise",
        keyMisses:
          "- Set up access to STC systems<br/>- Issue POs for previously awarded contracts (42) ",
        nextSteps:
          "- Processes: Develop exhaustive list of processes<br/>- Access to STC systems: Coordinate with TAWAL IT and TAWAL STC to establish link",
        keyRisks:
          "ERP: No control over spend on current Pos until PRs are uploaded to ERP ",
        mitigationPlan: ""
      }
    ],
    overall: {
      actual: 46,
      target: 58
    }
  },
  {
    name: "Site Lease Management",
    substreams: [
      {
        name: "Develop Site Lease Management Organization  ",
        actual: 88,
        target: 100,
        lastKeyAchievements: "",
        keyMisses:
          "- Organization design pending signed off on organization structure and functional statements<br/>- Job descriptions not received ",
        nextSteps:
          "- Approve organization design and job descriptions and expedite any recruitment activities ",
        keyRisks:
          "- Site Lease Organization: Risk of delay in processing of contracts in site lease ",
        mitigationPlan:
          "- Site Lease coordinating with HR to secure an additional resource within 2 weeks<br/>- Prioritize TAWAL site contracts over STC site contracts if needed "
      },
      {
        name: "Develop Site Lease Processes, Policies, Tools ",
        actual: 63,
        target: 83,
        lastKeyAchievements: "- Processes: Kick off processes exercise  ",
        keyMisses: "- Develop site lease policy ",
        nextSteps:
          "- Processes: Develop exhaustive list of processes<br/>- Meeting with CFO set to present progress on policy<br/>- Secure soft copy of all contracts from STC ",
        keyRisks:
          "- SL Tools & reporting: Data uploaded from STC PCC could not be accurate (ex: rentals in the database could be different from rentals in the contracts)<br/>- Abcense of contracts affects site lease management and site lease strategy as well as site lease negociations",
        mitigationPlan:
          "- All contracts to be reviewed to make the database accurate "
      },
      {
        name: "Develop Site Lease Strategy ",
        actual: 43,
        target: 66,
        lastKeyAchievements: "- Ongoing meetings with bidders ",
        keyMisses: "- Re-negotiation guidelines ",
        nextSteps: "Finalize technical evaluation of the bidders by Jul 18 ",
        keyRisks:
          "Delay in the strategy will delay re-negociation of contracts thus affecting SL efficiencies ",
        mitigationPlan:
          "- Fast-track the evaluation and signing of vendors (bids closing date: July 2) "
      },
      {
        name: "Develop Site Lease Monitoring and Reporting ",
        actual: 46,
        target: 73,
        lastKeyAchievements: "",
        keyMisses: "- Define reporting items<br/>- Identify enhancements ",
        nextSteps:
          "Assess E2E TMS functionalities during the tools demonstrations ",
        keyRisks:
          "- Some functionalities in the TMS might not align with requirements of site lease<br/>- site lease requires TMS functionalities to have complete intergration with Oracle ",
        mitigationPlan:
          "- Review funciontalities and integration capabilities of TMS with IT "
      }
    ],
    overall: {
      actual: 64,
      target: 83
    }
  }
];

export default class SpotlightView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="CFO Spotlight" match={this.props.match} />
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
