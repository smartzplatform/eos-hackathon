import React, { PureComponent } from "react";

import "./MiddleBar.less";

export default class MiddleBar extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="middle-bar flex-v">
        <input placeholder="Search" className="search" type="text" />
        {children}
      </div>
    );
  }
}
