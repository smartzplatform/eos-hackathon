import { observable, action } from "mobx";
import { rates as data } from "./mock";

export const screens = {
  LOGIN: "login",
  SUPPLIER: "supplier",
  CONSUMER: "consumer"
};

export class AppStore {
  @observable currentScreen;
  @observable login;
  @observable rates;

  constructor() {
    this.currentScreen = screens.LOGIN;
    this.login = false;
    this.rates = data;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("add rate")
  addRate(rate) {
    console.log("rate :", rate);
    this.rates.fields.push(rate);
  }
}

export default new AppStore();
