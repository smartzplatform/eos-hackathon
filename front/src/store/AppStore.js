import { observable, action } from "mobx";

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
  @observable devices;
  @observable statistics;

  constructor() {
    this.currentScreen = screens.LOGIN;
    this.login = false;
    this.rates = [];
    this.consumers = [];
    this.devices = [];
    this.statistics = [];
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("add rate")
  addRate(rate) {
    this.rates = rate;
  }

  @action("add consumer")
  addConsumer(consumer) {
    this.consumers = consumer;
  }

  @action("add device")
  addDevice(device) {
    this.devices = device;
  }

  @action("add statistics")
  addStat(statistic) {
    this.statistics = statistic;
  }
}

export default new AppStore();
