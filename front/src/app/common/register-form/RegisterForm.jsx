import React, { PureComponent } from "react";
import Form from "react-jsonschema-form";

import "./RegisterForm.less";

export default class RegisterForm extends PureComponent {
  render() {
    const { formSchema, uiSchema, onSubmit, title } = this.props;

    return (
      <div className="register-form">
        <h1>{title}</h1>
        <Form
          schema={formSchema}
          uiSchema={uiSchema}
          onSubmit={({ formData }) => onSubmit(formData)}
        >
          <button className="btn btn-submit" type="submit">
            ADD
          </button>
        </Form>
      </div>
    );
  }
}
