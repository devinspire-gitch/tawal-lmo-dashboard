import React, { Component, Fragment } from "react";
import { Row, Table, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

const spotlightData = [
  {
    name: "Network",
    substreams: [
      {
        name: "Conduct Technical and Financial Due Deligence ",
        actual: 10,
        target: 21,
        lastKeyAchievements:
          "Progress on technical evaluation. Comments were provided by the committee ",
        keyMisses:
          "Delayed commercial evaluation start following DELMEC new submission and technical evaluation",
        nextSteps:
          "-sign off technical evaluation<br/>- Evaluate commercial offers and kickoff negotiations ",
        keyRisks:
          "- Technical Due Diligence start date potentially delayed due to resubmission ",
        mitigationPlan:
          "- Track the timeline accurately and preempt the actions "
      },
      {
        name: "Develop Network Organization ",
        actual: 18,
        target: 48,
        lastKeyAchievements:
          "- Org. Sizing estimation by Network<br/>- List of 15 reassignments finalized ",
        keyMisses:
          "- Q2 recruiting target missed<br/>- Functional statements not signed off<br/>- Job descriptions not yet finalized ",
        nextSteps:
          "- Reconcile internal sizing and WTW org. Design<br/>- Receive Functional statements and sign them off<br/>- Job descriptions receive and validated ",
        keyRisks:
          "- Lack of resources to execute the overall detailed action plan for network (sizing discrepancies to solve vs WTW plan)<br/>- Misalignment with the business plan targets ",
        mitigationPlan:
          "- Secure arrival of critical resources through recruitment and reassignment (Tawal)<br/>- Refine the sizing "
      },
      {
        name: "Develop Network  Processes, Policies, Tools ",
        actual: 20,
        target: 36,
        lastKeyAchievements:
          "- Several Worshops with Commercial held to address NW processes ",
        keyMisses: "- Processes not validated yet by stakeholders and Q&A ",
        nextSteps:
          "- Start network policy draft<br/>- Draft all CDM processes (co-location, etc) ",
        keyRisks:
          "- 25 Processes written without guidelines for Network department ambitions<br/>- If delayed: Impact on project delivery, organization and inerdependencies management<br/>- Design processes not aligned with the policy ",
        mitigationPlan:
          "- Align with Strategy Q&A on process quality and validation<br/>- Align with remaining stakeholders on key processes developed<br/>- Write the policy and update as needed to reflect strategic options of network ( design outsourcing, etc.) "
      },
      {
        name: "Develop and Implement Efficiency Strategy - NW ",
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
      actual: 15,
      target: 31
    }
  },
  {
    name: "Operations",
    substreams: [
      {
        name: "Develop Operations Organization ",
        actual: 22,
        target: 48,
        lastKeyAchievements:
          "- List of reassignment completed (9 July, 8 August, 2 Oct) ",
        keyMisses:
          "- Q2 recruiting target missed<br/>- Functional statements not signed off<br/>- Job descriptions not yet finalized ",
        nextSteps: "- Recruit as per the Organization chart",
        keyRisks:
          "- Delayed takeover of the activities if recruiting falls behind the plan  ",
        mitigationPlan:
          "- Expedite sourcing and recruitment in alignment with HR "
      },
      {
        name: "Develop Operations  Processes, Policies, Tools ",
        actual: 11,
        target: 30,
        lastKeyAchievements:
          "- Finalized Operations policy<br/>- Finalized EHS policy<br/>- Completed two processes (dispute, proof of delivery) ",
        keyMisses: "",
        nextSteps:
          "- Validate Operations policy and EHS policy by COO<br/>- Get two processes approved<br/>- Continue to develop the remaining processes ",
        keyRisks:
          "- Missing policies: Processes written without guidelines for Ops. department ambitions<br/>- Impact on project delivery, organization and inerdependencies management ",
        mitigationPlan: "- Prioritizing policies and key processes "
      },
      {
        name: "Renew Managed services partnerships ",
        actual: 41,
        target: 47,
        lastKeyAchievements:
          "- Finalize technical section (part B) of the RFP<br/>- Completed of defining the scope of split ",
        keyMisses: "- Split of passive/active scope in MSP contracts ",
        nextSteps:
          "- Present MSP Strategic options to COO/CEO for validation<br/>- Agree with STC on splitting prices betweent Passive/active scope in MSP contracts ",
        keyRisks:
          "- Missing opportunity to capture cost savings efficiencies in new contract<br/>- E&M MS contract renewal don't achieve cost efficiencies targets ",
        mitigationPlan:
          "- Define overarching MSP strategy and gain sharing contract clauses "
      }
    ],
    overall: {
      actual: 16,
      target: 32
    }
  },
  {
    name: "PPC",
    substreams: [
      {
        name: "Develop PPC Organization ",
        actual: 18,
        target: 53,
        lastKeyAchievements: "",
        keyMisses: "No PPC Head to lead the stream ",
        nextSteps: "- Finalize organization leveraging HR inputs ",
        keyRisks:
          "- Not achieving staffing efifciencies in Ops, Network and T&I streams ",
        mitigationPlan:
          "- Appoint PCC resources working in Network during the vacancy of the PPC head position<br/>- Work closely with HR on expediting the recruitment of candidates in pipeline "
      },
      {
        name: "Develop PPC  Processes, Policies, Tools ",
        actual: 0,
        target: 16,
        lastKeyAchievements: "",
        keyMisses: "No PPC Head to lead the stream ",
        nextSteps: "- Start the process design and documentation ",
        keyRisks:
          "- Not achieving staffing efifciencies in Ops, Network and T&I streams ",
        mitigationPlan: ""
      }
    ],
    overall: {
      actual: 2,
      target: 15
    }
  },
  {
    name: "Technology & Innovation",
    substreams: [
      {
        name: "Develop IT Strategy ",
        actual: 61,
        target: 61,
        lastKeyAchievements: "",
        keyMisses: "",
        nextSteps: "",
        keyRisks: "",
        mitigationPlan: ""
      },
      {
        name: "Develop T&I Organization ",
        actual: 40,
        target: 55,
        lastKeyAchievements:
          "IT Business analyst joined team<br/>IT solution architect has agreed to join in principle (to be formalized) ",
        keyMisses:
          "Organizational design not confirmed and validated<br/>WTW functioal statements not confirmed for T&I ",
        nextSteps:
          "Confirm the organization structure for T&I<br/>Confirm the functional statements for T&I<br/>Add data migration expert (temp. if necessary)",
        keyRisks:
          "Critical positions if nor secured, may lead to delays due to lack of resources  to govern implementation of projects",
        mitigationPlan: "Secondment from STCs  "
      }
    ],
    overall: {
      actual: 27,
      target: 36
    }
  }
];

export default class SpotlightView extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="COO Spotlight" match={this.props.match} />
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
