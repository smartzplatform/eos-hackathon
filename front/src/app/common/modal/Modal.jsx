import React, { PureComponent } from "react";

import "./Modal.less";

export default class Modal extends PureComponent {
  render() {
    const { children, isOpen, onClose } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className="modal flex">
        <div className="window">
          <span className="closer" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
  }
}
