import { observable, action } from "mobx";

export const supplierScreens = {
  TABLE: "table",
  RATE_FORM: "rate_form",
  CONSUMER_FORM: "consumer_form",
  DEVICE_FORM: "device_form"
};

export class AppStore {
  @observable supplierScreen;

  constructor() {
    this.supplierScreen = supplierScreens.TABLE;
  }

  @action("set supplierScreen")
  setsupplierScreen(supplierScreen) {
    this.supplierScreen = supplierScreen;
  }
}

export default new AppStore();
