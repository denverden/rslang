import { extendObservable } from 'mobx';

class AppStore {
  constructor() {
    extendObservable(this, {
      isLoggedIn: false,
      userId: '',
      userToken: '',
      settings: {},
    });
  }
}

export default new AppStore();
