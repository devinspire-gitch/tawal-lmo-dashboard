import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle } from "reactstrap";

const data = [
  {
    label: "Technical Due Diligence start date delayed",
    time: "Today",
    color: "border-danger",
    key: 0
  },
  {
    label: "Hiring – need to fast-track the hiring of critical positions",
    time: "Today",
    color: "border-danger",
    key: 1
  },
  {
    label: "Data migration experts needed to support transition from STCS",
    time: "Today",
    color: "border-warning",
    key: 2
  },
  {
    label: "Recruitment agencies do not deliver CVs as fast as expected",
    time: "Tomorrow",
    color: "border-danger",
    key: 3
  },
  {
    label: "WTW deliverables are not in line with the overall plan",
    time: "Tomorrow",
    color: "border-danger",
    key: 4
  },
  {
    label: "Hiring – need to fast-track the hiring of critical positions",
    time: "29 Jul",
    color: "border-danger",
    key: 5
  },
  {
    label: "Incentive Plan not aligned with the Commercial staffing strategy",
    time: "29 Jul",
    color: "border-danger",
    key: 6
  },
  {
    label:
      "Organization: Staffing will be an issue to meet business dvpt ambitions & relationship mgmt (EBU, new bus., etc.)",
    time: "29 Jul",
    color: "border-danger",
    key: 7
  },
  {
    label: "ERP not ready for Go Live: delivery delayed by one week",
    time: "29 Jul",
    color: "border-danger",
    key: 8
  },
  {
    label: "EBU Products: Definition of the offer still pending",
    time: "31 Jul",
    color: "border-danger",
    key: 9
  },
  {
    label:
      "Tools & reporting: Data uploaded from STC PCC could not be accurate (ex: rentals in the database could be different from rentals in the contracts)",
    time: "31 Jul",
    color: "border-warning",
    key: 10
  },
  {
    label:
      "Mobily MSA: Risk to not secure the MSA signature based on diverging views on commercials",
    time: "03 Aug",
    color: "border-warning",
    key: 11
  }
];

const Logs = props => {
  return (
    <div>
      <Card {...props}>
        <CardBody>
          <CardTitle>Risks and Issues near due</CardTitle>
          <div className="issues-near-due-date">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <table className="table table-sm table-borderless">
                <tbody>
                  {data.map((log, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span
                            className={`log-indicator align-middle ${log.color}`}
                          />
                        </td>
                        <td>
                          <span className="font-weight-medium">
                            {log.label}
                          </span>
                        </td>
                        <td className="text-right">
                          <span className="text-muted">{log.time}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </PerfectScrollbar>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default Logs;
