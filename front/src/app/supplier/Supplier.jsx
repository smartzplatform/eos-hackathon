import React, { PureComponent } from "react";

import "./Supplier.less";
import AppStore from "../../store/AppStore";
import SupplierMain from "./supplier-main/SupplierMain";
import TopBar from "./../common/top-bar/TopBar";

export default class Supplier extends PureComponent {
  render() {
    const login = AppStore.login;

    const formSchema = {
      type: "object",
      required: ["name", "currency"],
      additionalProperties: false,
      properties: {
        name: {
          title: "Your name",
          type: "string",
          minLength: 2,
          maxLength: 100,
          pattern: "^[a-zA-Z]+$"
        },
        currency: {
          title: "Currency",
          type: "string"
        }
      }
    };

    const uiSchema = {
      name: {
        "ui:placeholder": "John Doe"
      },
      currency: {
        // "ui:widget": "",
        "ui:placeholder": "..."
      }
    };

    let content;
    if (login) {
      content = <RegisterForm formSchema={formSchema} uiSchema={uiSchema} />;
    } else {
      content = <SupplierMain />;
    }
    return (
      <div className="supplier-screen">
        <TopBar />
        {content}
      </div>
    );
  }
}
