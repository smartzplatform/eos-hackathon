import React, { PureComponent } from "react";
import Form from "react-jsonschema-form";

import "./RegisterForm.less";

export default class RegisterForm extends PureComponent {
  render() {
    const { formSchema, uiSchema, onSubmit } = this.props;

    return (
      <div className="register-form">
        <Form
          schema={formSchema}
          uiSchema={uiSchema}
          onSubmit={({ formData }) => onSubmit(formData)}
        >
          <button type="submit">Send</button>
        </Form>
      </div>
    );
  }
}
