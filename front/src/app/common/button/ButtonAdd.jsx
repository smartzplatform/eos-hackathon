import React, { PureComponent } from "react";

import "./ButtonAdd.less";

export default class Button extends PureComponent {
  render() {
    const { text, onClick } = this.props;

    return (
      <div className="button-add flex" onClick={onClick}>
        {text}
      </div>
    );
  }
}
