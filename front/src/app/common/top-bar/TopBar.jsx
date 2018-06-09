import React, { PureComponent } from "react";

import "./TopBar.less";

export default class TopBar extends PureComponent {
  render() {
    return (
      <div className="top-bar">
        <button className="btn btn-back flex">Back</button>
      </div>
    );
  }
}
