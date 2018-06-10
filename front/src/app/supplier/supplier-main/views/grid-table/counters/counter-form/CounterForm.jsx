import React, { PureComponent } from "react";

import "./CounterForm.less";
import RegisterForm from "../../../../../../common/register-form/RegisterForm";
import AppStore from "../../../../../../../store/AppStore";
import Eos from "../../../../../../../helpers/eos";
import Loader from "./../../../../../../common/loader/Loader";

export default class CounterForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.addDevice = this.addDevice.bind(this);
  }

  addDevice(formData) {
    const { model, consumer, rate, description } = formData;

    const dict = { electricity: "electricity", RFID: "rfidreader" };

    this.setState({ loading: true });

    Eos.sendTransaction("adddevice", {
      device_account: dict[model],
      user_account: consumer,
      rate_id: rate,
      description
    })
      .then(result => {
        this.props.onCloseModal();
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const formSchema = {
      type: "object",
      required: ["model", "consumer", "rate"],
      additionalProperties: false,
      properties: {
        model: {
          title: "Model/Type",
          type: "string",
          enum: ["electicity", "RFID"]
        },
        consumer: { title: "Consumer", type: "string" },
        rate: { title: "Rate", type: "string" },
        description: { title: "Description", type: "string" }
      }
    };

    const uiSchema = {
      consumer: {
        "ui:placeholder": "qwertyuiopas"
      },
      rate: {
        "ui:placeholder": "0"
      }
    };

    let content;
    if (this.state.loading) {
      content = <Loader />;
    } else {
      content = (
        <RegisterForm
          formSchema={formSchema}
          uiSchema={uiSchema}
          onSubmit={this.addDevice}
          title={"Add device"}
        />
      );
    }

    return <div className="counter-form">{content}</div>;
  }
}
