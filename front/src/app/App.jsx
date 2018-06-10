import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { observer } from "mobx-react";

import "./App.less";
import Login from "./login/Login";
import AppStore, { screens } from "../store/AppStore";
import Supplier from "./supplier/Supplier";
import Consumer from "./consumer/Consumer";

@observer
class App extends Component {
  render() {
    let content;
    switch (AppStore.currentScreen) {
      case screens.LOGIN:
        content = <Login />;
        break;
      case screens.SUPPLIER:
        content = <Supplier />;
        break;
      case screens.CONSUMER:
        content = <Consumer />;
        break;

      default:
        break;
    }
    return <div className="app screen flex">{content}</div>;
  }
}

export default hot(module)(App);
