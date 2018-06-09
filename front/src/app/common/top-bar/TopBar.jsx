import React, { PureComponent } from "react";
import { observer } from "mobx-react";
import AppStore, { screens } from "../../../store/AppStore";
import SupplierStore, { supplierScreens } from "../../../store/SupplierStore";

import "./TopBar.less";

@observer
export default class TopBar extends PureComponent {
  goBack() {
    const current = AppStore.currentScreen;

    switch (current) {
      case supplierScreens.TABLE:
        AppStore.setCurrentScreen(screens.LOGIN);
        break;
      case supplierScreens.RATE_FORM:
      case supplierScreens.CONSUMER_FORM:
      case supplierScreens.DEVICE_FORM:
        SupplierStore.setsupplierScreen(supplierScreens.TABLE);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="top-bar flex-v">
        <button className="btn btn-back flex" onClick={this.goBack}>
          <span>&#8592;</span>
          <span>Back</span>
        </button>
        <p>{AppStore.login}</p>
      </div>
    );
  }
}
