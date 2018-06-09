import React, { PureComponent } from "react";

import "./Login.less";
import AppStore, { screens } from "../../store/AppStore";

export default class Login extends PureComponent {
  render() {
    return (
      <div className="login-screen">
        <button
          className="btn btn-login"
          onClick={() => AppStore.setCurrentScreen(screens.SUPPLIER)}
        >
          Login as Sup
        </button>
        <button
          className="btn btn-login"
          onClick={() => AppStore.setCurrentScreen(screens.CONSUMER)}
        >
          Login as User
        </button>
      </div>
    );
  }
}
