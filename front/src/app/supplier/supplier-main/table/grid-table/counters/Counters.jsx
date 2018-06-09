import React, { PureComponent } from "react";

import "./Counters.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import SupplierStore, {
  supplierScreens
} from "../../../../../../store/SupplierStore";

export default class Counters extends PureComponent {
  setCountersForm() {
    SupplierStore.setsupplierScreen(supplierScreens.DEVICE_FORM);
  }

  render() {
    return (
      <div className="counters">
        Counters
        <ButtonAdd text={"Add counters +"} onClick={this.setCountersForm} />
      </div>
    );
  }
}
