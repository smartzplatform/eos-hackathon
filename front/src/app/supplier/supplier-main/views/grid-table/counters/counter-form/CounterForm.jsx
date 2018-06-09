import React, { PureComponent } from "react";

import "./CounterForm.less";
import RegisterForm from "../../../../../../common/register-form/RegisterForm";
import AppStore from "../../../../../../../store/AppStore";

export default class CounterForm extends PureComponent {
  constructor(props) {
    super(props);

    this.addDevice = this.addDevice.bind(this);
  }

  addDevice(formData) {
    AppStore.addDevice(formData);
    this.props.onCloseModal();
  }

  render() {
    const formSchema = {
      type: "object",
      required: ["model", "consumer", "rate"],
      additionalProperties: false,
      properties: {
        model: {
          title: "Model/Type",
          type: "string"
        },
        consumer: {
          title: "Consumer",
          type: "string"
        },
        rate: {
          title: "Rate",
          type: "string"
        }
      }
    };

    const uiSchema = {
      model: {
        "ui:placeholder": "John Doe"
      },
      consumer: {
        "ui:placeholder": "0"
      },
      rate: {
        "ui:placeholder": "0"
      }
    };

    return (
      <div className="counter-form">
        <RegisterForm
          onSubmit={this.addDevice}
          formSchema={formSchema}
          uiSchema={uiSchema}
          title={"Add device"}
        />
      </div>
    );
  }
}
