import React, { Component } from "react";

import "./SupplierMain.less";
import Table from "./table/Table";

export default class SupplierMain extends Component {
  render() {
    // let content;
    // switch (SupplierStore.supplierScreen) {
    //   case supplierScreens.TABLE:
    //     content = <Table />;
    //     break;
    //   case supplierScreens.RATE_FORM:
    //     content = <RateForm />;
    //     break;
    //   case supplierScreens.CONSUMER_FORM:
    //     content = <ConsumerForm />;
    //     break;
    //   case supplierScreens.DEVICE_FORM:
    //     content = <CounterForm />;
    //     break;

    //   default:
    //     break;
    // }
    return (
      <div className="supplier-main">
        <Table />
      </div>
    );
  }
}
