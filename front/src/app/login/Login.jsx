import React, { PureComponent } from "react";

import "./Login.less";
import AppStore, { screens } from "../../store/AppStore";
import Eos from "../../helpers/eos";

export default class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.identity = this.identity.bind(this);
  }

  identity() {
    // Eos.getIdentity(param => {
    //   AppStore.setMainScreen(screens.SUPPLIER);
    // });

    Eos.scatter.suggestNetwork(Eos.network).then(ok => {
      Eos.scatter
        .getIdentity({ accounts: [this.network] })
        .then(identity => {
          this.identity = identity;
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  render() {
    return (
      <div className="login-screen flex">
        <div className="wrapper flex">
          <div className="desc flex">
            <h1>SensorPay</h1>
            <p>EOSIO-based IoT Payment Platform</p>
          </div>
          <button
            className="btn btn-login"
            onClick={() => AppStore.setCurrentScreen(screens.SUPPLIER)}
          >
            Login as supplier
          </button>
          <button
            className="btn btn-login"
            onClick={() => AppStore.setCurrentScreen(screens.CONSUMER)}
          >
            Login as consumer
          </button>
        </div>
      </div>
    );
  }
}
