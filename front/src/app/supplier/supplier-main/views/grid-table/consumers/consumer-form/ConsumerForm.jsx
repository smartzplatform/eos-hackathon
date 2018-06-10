import React, { PureComponent } from "react";

import "./ConsumerForm.less";
import RegisterForm from "../../../../../../common/register-form/RegisterForm";
import Eos from "../../../../../../../helpers/eos";
// import { sendTransaction } from "../../../../../../../helpers/eos";
import Loader from "./../../../../../../common/loader/Loader";

export default class ConsumerForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.addConsumer = this.addConsumer.bind(this);
  }

  addConsumer(formData) {
    const { name, balance, description = "", meta = "" } = formData;

    this.setState({ loading: true });

    Eos.sendTransaction(
      ["adduser", "addbalance"],
      [
        {
          user_account: name,
          meta,
          description
        },
        { user_account: name, quantity: parseInt(balance) }
      ]
    )
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
      required: ["name", "balance"],
      additionalProperties: false,
      properties: {
        name: {
          title: "Name",
          type: "string",
          minLength: 12,
          maxLength: 12,
          pattern: "^[a-zA-Z]+$"
        },
        balance: { title: "Balance", type: "string" },
        description: { title: "Description", type: "string" },
        meta: { title: "Meta", type: "string" }
      }
    };

    const uiSchema = {
      name: { "ui:placeholder": "John Doe" },
      balance: {
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
          onSubmit={this.addConsumer}
          title={"Add consumer"}
        />
      );
    }

    return <div className="consumer-form">{content}</div>;
  }
}
