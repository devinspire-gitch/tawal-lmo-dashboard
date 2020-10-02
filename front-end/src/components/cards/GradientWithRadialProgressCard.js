import React from "react";
import { Card, CardBody } from "reactstrap";
import CircularProgressbar from "react-circular-progressbar";

const GradientWithRadialProgressCard = ({
  icon = null,
  title = "title",
  detail = "detail",
  percent = 80,
  progressText = "8/10",
  ...props
}) => {
  return (
    <Card
      {...props}
      className={`progress-banner ${!icon ? "progress-banner-no-icon" : ""} ${
        props.className
      }`}
    >
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          {icon && (
            <i
              className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
            />
          )}
          <div>
            <p className="lead text-white">{title}</p>
            <p className="text-small text-white mb-0">{detail}</p>
          </div>
        </div>
        <div
          className={`progress-bar-circle progress-bar-banner position-relative ${
            !icon ? "progress-bar-banner-no-icon" : ""
          }`}
        >
          <CircularProgressbar
            strokeWidth={icon ? 4 : 6}
            percentage={percent}
            text={progressText}
          />
        </div>
      </CardBody>
    </Card>
  );
};
export default GradientWithRadialProgressCard;
