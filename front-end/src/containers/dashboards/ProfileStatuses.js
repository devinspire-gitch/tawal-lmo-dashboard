import React from "react";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";

const data = [
  {
    title: "On Going",
    total: 1053,
    status: 111
  },
  {
    title: "Delayed Start",
    total: 1053,
    status: 84
  },
  {
    title: "Delayed",
    total: 1053,
    status: 151
  }
];

const ProfileStatuses = ({ cardClass = "h-100" }) => {
  return (
    <Card className={cardClass}>
      <CardBody>
        <CardTitle>Actions overview</CardTitle>
        {data.map((s, index) => {
          return (
            <div key={index} className="mb-4">
              <p className="mb-2">
                {s.title}
                <span className="float-right text-muted">
                  {s.status}/{s.total}
                </span>
              </p>
              <Progress value={(s.status / s.total) * 100} />
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};
export default ProfileStatuses;
