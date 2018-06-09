import { observable, action } from "mobx";
import { rates as dataRates, consumers as dataConsumers } from "./mock";

export const screens = {
  LOGIN: "login",
  SUPPLIER: "supplier",
  CONSUMER: "consumer"
};

export class AppStore {
  @observable currentScreen;
  @observable login;
  @observable rates;
  @observable consumers;

  constructor() {
    this.currentScreen = screens.LOGIN;
    this.login = false;
    this.rates = dataRates;
    this.consumers = dataConsumers;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("add rate")
  addRate(rate) {
    this.rates.fields.push(rate);
  }

  @action("add consumer")
  addConsumer(consumer) {
    this.consumers.fields.push(consumer);
  }
}

export default new AppStore();
