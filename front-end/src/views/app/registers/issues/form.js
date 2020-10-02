import React, { Component, Fragment } from "react";
import { Redirect, withRouter, NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import moment from "moment";
import {
  Row,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ReactQuill from "react-quill";
import { PRIORITY, ISSUE_STATUS } from "common/constants";
import {
  Colxx,
  Separator
} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import API from "../../../../helpers/API";

import "react-quill/dist/quill.bubble.css";
import "react-datepicker/dist/react-datepicker.css";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    const { match } = props;
    this.state = {
      isNewRecord: !match.params.id,
      redirectTo: null,
      resource: {
        activity: "",
        description: "",
        mitigationActions: "",
        responsible: "",
        dueDate: null,
        completedDate: null,
        comments: "",
        priorityId: null,
        statusId: 1,
        typeId: null,
        workstreamId: null,
        substreamId: null
      },
      selectedOptions: {
        statusId: Object.keys(ISSUE_STATUS)
          .map(key => ISSUE_STATUS[key])
          .map(item => ({
            value: item.id,
            label: item.name
          }))[0]
      },
      availableOptions: {
        statusId: Object.keys(ISSUE_STATUS)
          .map(key => ISSUE_STATUS[key])
          .map(item => ({
            value: item.id,
            label: item.name
          })),
        priorityId: Object.keys(PRIORITY)
          .map(key => PRIORITY[key])
          .map(item => ({
            value: item.id,
            label: item.name
          }))
      }
    };
  }

  handleSelectChange = async (selection, action) => {
    const { selectedOptions } = this.state;
    await this.setState({
      selectedOptions: {
        ...selectedOptions,
        [action.name]: selection
      }
    });
    if (selection && selection.length) {
      const values = selection.map(item => item.value);
      this.updateResourceField(action.name, values);
    } else {
      this.updateResourceField(action.name, selection ? selection.value : null);
    }
  };

  handleWorkstreamChange = async (selection, action) => {
    await this.handleSelectChange(selection, action);
    await this.handleSelectChange(null, { name: "substreamId" });
    if (selection) {
      this.loadAvailableOptions("substreamId", "/substreams", {
        params: {
          filter: {
            where: {
              workstreamId: selection.value
            }
          }
        }
      });
    }
  };

  handleInputChange = e =>
    this.updateResourceField(e.target.name, e.target.value);

  handleSubmit = async event => {
    event.preventDefault();
    const { resource } = this.state;
    const response = await this.API.put("/issues", resource);
    this.setState({
      redirectTo: `/app/registers/issues/details/${response.data.id}`
    });
  };

  updateResourceField = (field, date) => {
    const { resource } = this.state;
    this.setState({
      resource: {
        ...resource,
        [field]: date
      }
    });
  };

  loadAvailableOptions = async (field, endpoint, params) => {
    const response = await this.API.get(endpoint, params);
    const options = response.data.map(data => ({
      value: data.id,
      label: data.name
    }));
    const { availableOptions } = this.state;
    this.setState({
      availableOptions: {
        ...availableOptions,
        [field]: options
      }
    });
  };

  loadResourceIfNeeded = async () => {
    const { match } = this.props;
    if (match.params.id) {
      let response;
      try {
        response = await this.API.get(`/issues/${match.params.id}`, {
          params: {
            filter: {
              include: ["type", "workstream", "substream"]
            }
          }
        });
      } catch (err) {
        this.setState({
          redirectTo: "/error"
        });
      }
      const resource = response.data;
      if (resource.workstream) {
        await this.loadAvailableOptions("substreamId", "/substreams", {
          params: {
            filter: {
              where: {
                workstreamId: resource.workstreamId
              }
            }
          }
        });
      }
      this.setState({
        resource: {
          ...resource,
          type: undefined,
          workstream: undefined,
          substream: undefined,
          dueDate: resource.dueDate ? moment(resource.dueDate) : null,
          completedDate: resource.completedDate
            ? moment(resource.completedDate)
            : null
        },
        selectedOptions: {
          typeId: resource.type
            ? {
                value: resource.type.id,
                label: resource.type.name
              }
            : null,
          workstreamId: resource.workstream
            ? {
                value: resource.workstream.id,
                label: resource.workstream.name
              }
            : null,
          substreamId: resource.substream
            ? {
                value: resource.substream.id,
                label: resource.substream.name
              }
            : null,
          priorityId: resource.priorityId
            ? Object.keys(PRIORITY)
                .map(key => PRIORITY[key])
                .map(item => ({
                  value: item.id,
                  label: item.name
                }))
                .find(item => item.value === resource.priorityId)
            : null,
          statusId: resource.statusId
            ? Object.keys(ISSUE_STATUS)
                .map(key => ISSUE_STATUS[key])
                .map(item => ({
                  value: item.id,
                  label: item.name
                }))
                .find(item => item.value === resource.statusId)
            : null
        }
      });
    }
  };

  async componentDidMount() {
    await Promise.all([
      this.loadAvailableOptions("typeId", "/issueTypes"),
      this.loadAvailableOptions("workstreamId", "/workstreams")
    ]);
    this.loadResourceIfNeeded();
  }

  render() {
    const { match } = this.props;
    const {
      isNewRecord,
      resource,
      redirectTo,
      availableOptions,
      selectedOptions
    } = this.state;

    if (redirectTo) return <Redirect to={redirectTo} />;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              {isNewRecord
                ? "New Risk or Issue"
                : resource.code
                ? resource.code
                : "Edit Risk or Issue"}
            </h1>
            {!isNewRecord && (
              <div className="text-zero top-right-button-container">
                <NavLink
                  to={`../details/${match.params.id}`}
                  className="btn btn-secondary btn-lg top-right-button mr-1 text-uppercase"
                >
                  Back to Details
                </NavLink>
              </div>
            )}
            <Breadcrumb match={match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>Type</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="typeId"
                          value={selectedOptions.typeId}
                          onChange={this.handleSelectChange}
                          options={availableOptions.typeId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>
                          Activity
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Input
                          type="text"
                          name="activity"
                          value={resource.activity}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>Priority</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="priorityId"
                          value={selectedOptions.priorityId}
                          onChange={this.handleSelectChange}
                          options={availableOptions.priorityId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label>Status</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="statusId"
                          value={selectedOptions.statusId}
                          onChange={this.handleSelectChange}
                          options={availableOptions.statusId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label>Workstream</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="workstreamId"
                          value={selectedOptions.workstreamId}
                          onChange={this.handleWorkstreamChange}
                          options={availableOptions.workstreamId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <FormGroup>
                        <Label>Substream</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="substreamId"
                          value={selectedOptions.substreamId}
                          onChange={this.handleSelectChange}
                          options={availableOptions.substreamId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label>Risk / Issue description</Label>
                        <Input
                          type="text"
                          name="description"
                          value={resource.description}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label>Mitigation Actions</Label>
                        <Input
                          type="text"
                          name="mitigationActions"
                          value={resource.mitigationActions}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12} md={4}>
                      <FormGroup>
                        <Label>Responsible</Label>
                        <Input
                          type="text"
                          name="responsible"
                          value={resource.responsible}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={4}>
                      <FormGroup>
                        <Label>Due Date</Label>
                        <DatePicker
                          selected={resource.dueDate}
                          onChange={date =>
                            this.updateResourceField("dueDate", date)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={4}>
                      <FormGroup>
                        <Label>
                          Completed Date
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <DatePicker
                          selected={resource.completedDate}
                          onChange={date =>
                            this.updateResourceField("completedDate", date)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <FormGroup>
                        <Label>
                          Comments
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <ReactQuill
                          theme="bubble"
                          value={resource.comments}
                          onChange={data =>
                            this.updateResourceField("comments", data)
                          }
                        />
                      </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <Button color="primary" size="lg" className="text-uppercase">
                    {isNewRecord ? "Create" : "Save"}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default withRouter(injectIntl(FormPage));
