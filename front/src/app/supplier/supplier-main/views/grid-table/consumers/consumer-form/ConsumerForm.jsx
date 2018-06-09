import React, { PureComponent } from "react";

import "./ConsumerForm.less";
import RegisterForm from "../../../../../../common/register-form/RegisterForm";
import Eos from "../../../../../../../helpers/eos";
// import { sendTransaction } from "../../../../../../../helpers/eos";

export default class ConsumerForm extends PureComponent {
  constructor(props) {
    super(props);

    this.addConsumer = this.addConsumer.bind(this);
  }

  addConsumer(formData) {
    const { name, balance, description, meta } = formData;

    Eos.sendTransaction(
      ["adduser", "addbalance"],
      [
        {
          user_account: name,
          meta,
          description
        },
        { user_account: name, quantity: balance }
      ]
    )
      .then(result => {
        console.log(result);
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
        // "ui:widget": "",
        "ui:placeholder": "0"
      }
    };

    return (
      <div className="consumer-form">
        <RegisterForm
          formSchema={formSchema}
          uiSchema={uiSchema}
          onSubmit={this.addConsumer}
          title={"Add consumer"}
        />
      </div>
    );
  }
}
