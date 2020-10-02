import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, Jumbotron, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IconCard from "../../components/cards/IconCard";
import Logs from "../../containers/dashboards/Logs";
import ProfileStatuses from "../../containers/dashboards/ProfileStatuses";
import Breadcrumb from "../../containers/navs/Breadcrumb";

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  getUserData = () => {
    let user = localStorage.getItem("user");
    if (!user) return;
    try {
      user = JSON.parse(user);
      this.setState({ user });
    } catch (err) {}
  };

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="Tawal's Activity Portal" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="8" className="mb-4">
            <Card>
              <CardBody>
                <Jumbotron className="pt-4 pb-0">
                  <h1 className="display-4">
                    Hello{user.name ? `, ${user.name.split(" ").shift()}` : ""}
                  </h1>
                  <p className="lead">Welcome to Tawal's Activity Portal.</p>
                  <hr className="my-4" />
                  <p>
                    Please refer to the side menu for reports, registers and
                    more.
                  </p>
                  <p className="lead mb-0">
                    <NavLink
                      to={"./registers/actions/create"}
                      className="btn btn-primary btn-lg mr-2 text-uppercase"
                    >
                      Add new Action
                    </NavLink>
                    <NavLink
                      to={"./reports/progress"}
                      className="btn btn-secondary btn-lg mr-2 text-uppercase"
                    >
                      View Overall Progress
                    </NavLink>
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>
            <Row className="icon-cards-row py-4">
              <Colxx xs="6" md="3">
                <IconCard
                  title="Overall Progress"
                  icon="iconsminds-check"
                  value={"24%"}
                  className="mb-2"
                />
              </Colxx>
              <Colxx xs="6" md="3">
                <IconCard
                  title="Days Until D-0+6 Soft Launch"
                  icon="iconsminds-calendar-1"
                  value={67}
                  className="mb-2"
                />
              </Colxx>
              <Colxx xs="6" md="3">
                <IconCard
                  title="Days Until Autonomous"
                  icon="iconsminds-communication-tower-2"
                  value={250}
                  className="mb-2"
                />
              </Colxx>
              <Colxx xs="6" md="3">
                <IconCard
                  title="Recruitment Progress"
                  icon="iconsminds-male-female"
                  value={"93 / 272"}
                  className="mb-2"
                />
              </Colxx>
            </Row>
          </Colxx>
          <Colxx lg="4" className="mb-4">
            <Logs className="mb-4" />
            <ProfileStatuses cardClass="" />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
