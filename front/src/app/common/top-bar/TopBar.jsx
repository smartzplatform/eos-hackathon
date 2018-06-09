import React, { Component } from "react";
import { observer } from "mobx-react";
import AppStore, { screens } from "../../../store/AppStore";

import "./TopBar.less";

@observer
export default class TopBar extends Component {
  render() {
    return (
      <div className="top-bar flex-v">
        <button
          className="btn btn-back flex"
          onClick={param => console.log("msg")}
        >
          <span>&#8592;</span>
          <span>Back</span>
        </button>
        <p>{AppStore.login}</p>
      </div>
    );
  }
}
