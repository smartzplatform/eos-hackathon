import React, { PureComponent } from "react";

import "./Rates.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import SupplierStore, {
  supplierScreens
} from "../../../../../../store/SupplierStore";

export default class Rates extends PureComponent {
  setRateForm() {
    SupplierStore.setsupplierScreen(supplierScreens.RATE_FORM);
  }

  render() {
    return (
      <div className="rates">
        Rates
        <ButtonAdd text={"Add rates +"} onClick={this.setRateForm} />
      </div>
    );
  }
}
