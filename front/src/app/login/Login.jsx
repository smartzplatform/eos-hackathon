import React, { PureComponent } from "react";

import "./Login.less";
import AppStore, { screens } from "../../store/AppStore";
import Eos from "../../helpers/eos";

export default class Login extends PureComponent {
  identity() {
    Eos.getIdentity(param => {
      console.log(this.identity);
    });
    // () => AppStore.setMainScreen(screens.SUPPLIER)
  }

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
