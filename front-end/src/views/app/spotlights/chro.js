import React, { Component, Fragment } from "react";
import { Row, Table, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

const spotlightData = [
  {
    name: "HR",
    substreams: [
      {
        name: "Develop HR Strategy ",
        actual: 91,
        target: 100,
        lastKeyAchievements:
          "Initial HR Strategy Drafted and shared with CxOs ",
        keyMisses: "Gain required Sign-off from CxOs ",
        nextSteps: "Align on timeline of implementation plan ",
        keyRisks: "WTW fail to deliver on agreed July-11 deadline ",
        mitigationPlan:
          "Push WTW to deliver on agreed deadline and ensure additional requirements are communicated appropriately "
      },
      {
        name: "Develop Tawal Organization ",
        actual: 24,
        target: 51,
        lastKeyAchievements:
          "1. Organization Design has been developed<br/>2. Critical roles have been identified<br/>3. Functional statements have been developed<br/>4. Securing of 94 FTEs across TAWAL",
        keyMisses:
          "1. Job evaluation and naming of positions<br/>2. Organization structure sign off<br/>3. Functional statements sign off<br/>4. 59 JDs draft and sign off<br/>5. P1 recruitment target ",
        nextSteps:
          "1. Verify job evaluation and namings with CEO<br/>2. Expedite CxO organization structure sign off and Functional statements sign off<br/>3. Push WTW to collect pending JDs ",
        keyRisks:
          "1. Recruitment delays due to pending JDs for vacant positions<br/>2. Misalignment between CxO expectations and pending WTW deliverables<br/>3. P2 recruitment milestone potentially to be missed ",
        mitigationPlan:
          "1. Align job evaluation with CEO<br/>2. Set up meetings with functions to garner organization structure and FS sign off<br/>3. Follow up with WTW on pending JDs<br/>4. Set internal CV sourcing KPIs "
      },
      {
        name: "Develop HR Policies, Processes,Tools ",
        actual: 30,
        target: 58,
        lastKeyAchievements:
          "1. Initial compensation & benefits policy drafted<br/>2. List of 43 policies and processes identified ",
        keyMisses:
          "1. Compensation and Benefits policy sign off<br/>2- Initial draft of 43 policies and processes",
        nextSteps:
          "1. Finalize Compensation and Benefits policy<br/>2. Draft remaining policies and processes ",
        keyRisks:
          "Lack of of clear guidelines in order to make fundamental HR related decisions ",
        mitigationPlan:
          "1. Push WTW to deliver Compensation & Benefits policy<br/>2. Expedite and closely monitor drafting of policies and processes"
      },
      {
        name: "Develop Tawal Workforce Plan ",
        actual: 9,
        target: 43,
        lastKeyAchievements:
          "1. Initial benchmark vs baseline assessment completed<br/>2. Alignment sessions with CxOs kickstarted ",
        keyMisses: "Failiure to reach agreed upon 272 target in BP ",
        nextSteps:
          "1. Meet with CxOs and discuss manpower priorities<br/>2. Revise initial assessment<br/>3. Gain required signoff ",
        keyRisks:
          "1. Unknown recruitment targets for functions<br/>2. Potential impact on 2019 and 2020 budget ",
        mitigationPlan:
          "HR team and Strategy& to expedite manpower assessment next steps "
      },
      {
        name: "Define Employee performance & development ",
        actual: 0,
        target: 0,
        lastKeyAchievements: "",
        keyMisses: "",
        nextSteps: "",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Develop HR Reporting Capability ",
        actual: 0,
        target: 0,
        lastKeyAchievements: "",
        keyMisses: "",
        nextSteps: "",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Build Tawal Offices ",
        actual: 20,
        target: 25,
        lastKeyAchievements: "Imar selected as building fitout consultant ",
        keyMisses: "",
        nextSteps:
          "Setup committee of all functional heads to align on building requirements  ",
        keyRisks: "",
        mitigationPlan: ""
      }
    ],
    overall: {
      actual: 17,
      target: 38
    }
  }
];

export default class SpotlightView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="CHRO Spotlight" match={this.props.match} />
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
