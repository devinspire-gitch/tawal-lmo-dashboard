import React, { Component, Fragment } from "react";
import { Row, Table, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

const spotlightData = [
  {
    name: "Commercial",
    substreams: [
      {
        name: "Develop Commercial Strategy ",
        actual: 80,
        target: 100,
        lastKeyAchievements:
          "Follow-up presentation of Business Model Building Blocks and update of strategy based on Commercial team input<br/>Finalization of Draft Commercial Vision, Mission and Propositions ",
        keyMisses: "Delay in detailing key enablers ",
        nextSteps:
          "Finalize key building blocks, update top line impact and initiatives, begin to detail key enablers ",
        keyRisks: "Delay in completing Commercial Strategy on time ",
        mitigationPlan:
          "Prioritze selected key enablers across commercial strategy "
      },
      {
        name: "Develop Commercial Organization ",
        actual: 43,
        target: 76,
        lastKeyAchievements:
          "Organization structure finalized (sign-off missing)<br/>N-2 functional statements shared by WTW and feedback provided by TAWAL ",
        keyMisses: "Functional statements and JDs delayed ",
        nextSteps:
          "Finalize funcitonal statements and job descriptions<br/>Sign-off of org structure ",
        keyRisks:
          "Critical recruitment delays impact delivery of all key commercial activities ",
        mitigationPlan:
          "Additional recruitment effort driven by CCO/ HR; Mitigate through Manager hiring<br/>HR/ CEO to follow-up with WTW on delivery"
      },
      {
        name: "Develop Commercial Processes, Policies, Tools ",
        actual: 14,
        target: 23,
        lastKeyAchievements:
          "16 key processes have been identified and aligned between AML, Network, Commercial and Strategy&<br/>First 5 processes have been drafted ",
        keyMisses: "Delayed simulation to illustrate holistic process view ",
        nextSteps:
          "Further alignment with CCO to address prioritization and completeness ",
        keyRisks:
          "(Almost) All Commercial processes are critical, not enough recourcing to develop all processes already<br/>Many activities are run in parallel by different teams, coordination is critical<br/>Level of detail of process not yet fully aligned ",
        mitigationPlan:
          "Process kick-off meeting with CxOs<br/>Discuss expected level of detail "
      },
      {
        name: "Develop Sales & Account Management ",
        actual: 0,
        target: 0,
        lastKeyAchievements: "",
        keyMisses: "",
        nextSteps: "",
        keyRisks: "",
        mitigationPlan: ""
      }
    ],
    overall: {
      actual: 33,
      target: 47
    }
  }
];

export default class SpotlightView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="CCO Spotlight" match={this.props.match} />
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
