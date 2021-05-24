class Auth {
  constructor() {
    this.authenthicated = "";
  }

  login(token) {
    this.authenticated = token;
    localStorage.setItem("token", JSON.stringify(token));
  }

  logout() {
    this.authenticated = "";
    localStorage.removeItem("token");
  }

  isAuthenticated() {
    this.authenthicated = localStorage.getItem("token");
    return this.authenthicated !== null;
  }
}

export default new Auth();
