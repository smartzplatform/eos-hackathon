import React, { Component } from "react";
import { observer } from "mobx-react";
import AppStore, { screens } from "../../../store/AppStore";

import "./TopBar.less";

@observer
export default class TopBar extends Component {
  render() {
    return (
      <div className="top-bar flex-v">
        <div className="logo">
          <h2>SensorPay</h2>
        </div>
        <span className="nickname">Username</span>
      </div>
    );
  }
}
