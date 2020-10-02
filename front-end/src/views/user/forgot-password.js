import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "admin@tawal.dev"
    };
  }
  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card shadow">
            <div className="position-relative image-side ">
              <p className="text-white h2 font-weight-bold text-shadow-lg">
                TO MAKE NEW POSSIBILITIES{" "}
                <span className="text-primary">ENDLESS</span>
              </p>
              <p className="text-white h2 font-weight-bold text-shadow-lg">
                BY MAKING CONNECTIVITY{" "}
                <span className="text-primary">LIMITLESS</span>
              </p>
              <p className="white mt-5 mb-0 text-shadow-lg">
                Please use your e-mail to reset your password.
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.forgot-password" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  <IntlMessages id="user.email" />
                </Label>

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    href="/app"
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                  >
                    <IntlMessages id="user.reset-password-button" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
