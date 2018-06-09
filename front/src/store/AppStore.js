import { observable, action } from "mobx";

export class AppStore {
  @observable profile;

  constructor() {
    this.profile = null;
  }

  @action("set profile")
  setProfile(profile) {
    this.profile = profile;
  }
}

export default new AppStore();
