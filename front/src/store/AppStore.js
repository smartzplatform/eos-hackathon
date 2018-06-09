import { observable, action } from "mobx";

export const screens = {
  LOGIN: "login",
  SUPPLIER: "supplier",
  CONSUMER: "consumer"
};

export class AppStore {
  @observable currentScreen;
  @observable login;

  constructor() {
    this.currentScreen = screens.LOGIN;
    this.login = false;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }
}

export default new AppStore();
