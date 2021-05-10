class Auth {
  constructor() {
    this.authenthicated = false;
  }

  login(cb: () => void) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
