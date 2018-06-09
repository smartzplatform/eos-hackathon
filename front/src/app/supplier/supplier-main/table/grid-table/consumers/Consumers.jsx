import React, { PureComponent } from "react";

import "./Consumers.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import SupplierStore, {
  supplierScreens
} from "../../../../../../store/SupplierStore";

export default class Consumers extends PureComponent {
  setConsumersForm() {
    SupplierStore.setsupplierScreen(supplierScreens.CONSUMER_FORM);
  }

  render() {
    return (
      <div className="consumers">
        Consumers
        <ButtonAdd text={"Add consumer +"} onClick={this.setConsumersForm} />
      </div>
    );
  }
}
