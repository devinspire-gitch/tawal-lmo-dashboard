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
import { Handle } from "rc-slider";
import {
  Colxx,
  Separator
} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import { SliderTooltip } from "../../../../components/common/SliderTooltips";
import API from "../../../../helpers/API";

import "react-quill/dist/quill.bubble.css";
import "react-datepicker/dist/react-datepicker.css";

const sliderHandle = props => {
  const { value, dragging, index, offset, ...restProps } = props;
  const positionStyle = {
    position: "absolute",
    left: `${offset}%`
  };
  return (
    <Fragment key={index}>
      <div className="rc-slider-tooltip" style={positionStyle}>
        {value + "%"}
      </div>
      <Handle value={value} offset={offset} {...restProps} />
    </Fragment>
  );
};

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
        deliverable: "",
        personResponsible: "",
        predecessor: "",
        successor: "",
        action: "",
        actionActualProgress: 0,
        actionStartDate: null,
        baselineEndDate: null,
        updatedEndDate: null,
        actualStartDate: null,
        actionRealizationDate: null,
        risksAndIssues: "",
        comments: "",
        operatingModelId: null,
        chiefId: null,
        workstreamId: null,
        substreamId: null
      },
      selectedOptions: {},
      availableOptions: {}
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
    const response = await this.API.put("/actions", resource);
    this.setState({
      redirectTo: `/app/registers/actions/details/${response.data.id}`
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
        response = await this.API.get(`/actions/${match.params.id}`, {
          params: {
            filter: {
              include: [
                "chief",
                "operatingModel",
                "workstream",
                "substream",
                "valueBlocks"
              ]
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
          chief: undefined,
          operatingModel: undefined,
          workstream: undefined,
          substream: undefined,
          valueBlocks: undefined,
          actionStartDate: resource.actionStartDate
            ? moment(resource.actionStartDate)
            : null,
          baselineEndDate: resource.baselineEndDate
            ? moment(resource.baselineEndDate)
            : null,
          updatedEndDate: resource.updatedEndDate
            ? moment(resource.updatedEndDate)
            : null,
          actualStartDate: resource.actualStartDate
            ? moment(resource.actualStartDate)
            : null,
          actionRealizationDate: resource.actionRealizationDate
            ? moment(resource.actionRealizationDate)
            : null,
          valueBlockIds: resource.valueBlocks.map(item => item.id)
        },
        selectedOptions: {
          chiefId: resource.chief
            ? {
                value: resource.chief.id,
                label: resource.chief.name
              }
            : null,
          operatingModelId: resource.operatingModel
            ? {
                value: resource.operatingModel.id,
                label: resource.operatingModel.name
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
          valueBlockIds: resource.valueBlocks.map(item => ({
            value: item.id,
            label: item.name
          }))
        }
      });
    }
  };

  async componentDidMount() {
    await Promise.all([
      this.loadAvailableOptions("chiefId", "/chiefs"),
      this.loadAvailableOptions("operatingModelId", "/operatingModels"),
      this.loadAvailableOptions("workstreamId", "/workstreams"),
      this.loadAvailableOptions("valueBlocks", "/valueBlocks")
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
                ? "New Action"
                : resource.code
                ? resource.code
                : "Edit Action"}
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
                    <Colxx sm={6} md={2}>
                      <FormGroup>
                        <Label>Chief</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="chiefId"
                          value={selectedOptions.chiefId}
                          onChange={this.handleSelectChange}
                          options={availableOptions.chiefId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={4}>
                      <FormGroup>
                        <Label>Operating Model</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="operatingModelId"
                          value={selectedOptions.operatingModelId}
                          onChange={this.handleSelectChange}
                          options={availableOptions.operatingModelId}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12} md={6}>
                      <FormGroup>
                        <Label>
                          Value Blocks
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="valueBlockIds"
                          value={selectedOptions.valueBlockIds}
                          onChange={this.handleSelectChange}
                          options={availableOptions.valueBlocks}
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

                    <Colxx sm={12} md={6}>
                      <FormGroup>
                        <Label>Activity</Label>
                        <Input
                          type="text"
                          name="activity"
                          value={resource.activity}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12} md={6}>
                      <FormGroup>
                        <Label>Action</Label>
                        <Input
                          type="text"
                          name="action"
                          value={resource.action}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={4}>
                      <FormGroup>
                        <Label>
                          Deliverable
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Input
                          type="text"
                          name="deliverable"
                          value={resource.deliverable}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={4}>
                      <FormGroup>
                        <Label>
                          Person Responsible
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Input
                          type="text"
                          name="personResponsible"
                          value={resource.personResponsible}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={2}>
                      <FormGroup>
                        <Label>
                          Predecessor
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Input
                          type="text"
                          name="predecessor"
                          value={resource.predecessor}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={2}>
                      <FormGroup>
                        <Label>
                          Successor
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Input
                          type="text"
                          name="successor"
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={3}>
                      <FormGroup>
                        <Label>
                          Action Start Date
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <DatePicker
                          selected={resource.actionStartDate}
                          onChange={date =>
                            this.updateResourceField("actionStartDate", date)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={3}>
                      <FormGroup>
                        <Label>
                          Actual Start Date
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <DatePicker
                          selected={resource.actualStartDate}
                          onChange={date =>
                            this.updateResourceField("actualStartDate", date)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={3}>
                      <FormGroup>
                        <Label>
                          Baseline End Date
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <DatePicker
                          selected={resource.baselineEndDate}
                          onChange={date =>
                            this.updateResourceField("baselineEndDate", date)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={3}>
                      <FormGroup>
                        <Label>
                          Updated End Date
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <DatePicker
                          selected={resource.updatedEndDate}
                          onChange={date =>
                            this.updateResourceField("updatedEndDate", date)
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={3}>
                      <FormGroup>
                        <Label>
                          Action Realization Date
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <DatePicker
                          selected={resource.actionRealizationDate}
                          onChange={date =>
                            this.updateResourceField(
                              "actionRealizationDate",
                              date
                            )
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={6} md={3}>
                      <FormGroup>
                        <Label>Action Progress</Label>
                        <SliderTooltip
                          min={0}
                          max={100}
                          defaultValue={0}
                          value={resource.actionActualProgress}
                          handle={sliderHandle}
                          className="mb-5"
                          onChange={value =>
                            this.updateResourceField(
                              "actionActualProgress",
                              value
                            )
                          }
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={12} md={6}>
                      <FormGroup>
                        <Label>
                          Risks &amp; Issues
                          <small className="text-muted mx-1">(Optional)</small>
                        </Label>
                        <Input
                          type="text"
                          name="risksAndIssues"
                          onChange={this.handleInputChange}
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
