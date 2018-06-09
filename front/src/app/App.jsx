import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { observer } from "mobx-react";

import "./App.less";

@observer
class App extends Component {
  render() {
    return <div className="app screen flex">Hi</div>;
  }
}

export default hot(module)(App);
