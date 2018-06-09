import React, { Component } from "react";

import "./SupplierMain.less";
import Table from "./table/Table";
import RateForm from "./rate-form/RateForm";
import SupplierStore, { supplierScreens } from "../../../store/SupplierStore";
import { observer } from "mobx-react";

@observer
export default class SupplierMain extends Component {
  render() {
    let content;
    console.log(SupplierStore.supplierScreen);
    switch (SupplierStore.supplierScreen) {
      case supplierScreens.TABLE:
        content = <Table />;
        break;
      case supplierScreens.RATE_FORM:
        content = <RateForm />;
        break;
      case supplierScreens.CONSUMER_FORM:
        content = <Table />;
        break;
      case supplierScreens.DEVICE_FORM:
        content = <Table />;
        break;

      default:
        break;
    }
    return <div className="supplier-main">{content}</div>;
  }
}
