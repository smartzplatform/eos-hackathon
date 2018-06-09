import { observable, action } from "mobx";
import AppStore from "./AppStore";

export const supplierScreens = {
  TABLE: "table",
  RATE_FORM: "rate_form",
  CONSUMER_FORM: "consumer_form",
  DEVICE_FORM: "device_form"
};

export class SupplierStore {
  @observable supplierScreen;

  constructor() {
    this.supplierScreen = supplierScreens.TABLE;
  }

  @action("set supplierScreen")
  setsupplierScreen(supplierScreen) {
    this.supplierScreen = supplierScreen;
    AppStore.setCurrentScreen(supplierScreen);
  }
}

export default new SupplierStore();
