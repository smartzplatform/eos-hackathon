import { observable, action } from "mobx";

export const screens = {
  LOGIN: "login",
  SUPPLIER: "supplier",
  CONSUMER: "consumer"
};

export class AppStore {
  @observable mainScreen;
  @observable currentScreen;
  @observable login;

  constructor() {
    this.mainScreen = screens.LOGIN;
    this.login = false;
  }

  @action("set mainScreen")
  setMainScreen(mainScreen) {
    this.mainScreen = mainScreen;
    this.setCurrentScreen(mainScreen);
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }
}

export default new AppStore();
