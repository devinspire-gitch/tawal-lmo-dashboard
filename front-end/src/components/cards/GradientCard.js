import React from "react";
import { Card, CardBody } from "reactstrap";

const GradientCard = ({ children }) => {
  return (
    <Card className="dashboard-sq-banner justify-content-end">
      <CardBody className="justify-content-end d-flex flex-column">
        {children}
      </CardBody>
    </Card>
  );
};
export default GradientCard;
