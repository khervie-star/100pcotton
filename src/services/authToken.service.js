class AuthTokenService {
  getLocalRefreshToken() {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.refreshToken;
    }
  }

  getLocalAccessToken() {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("token"));
      return user?.token;
    }
  }

  updateLocalAccessToken(token) {
    if (typeof window !== "undefined") {
      let user = JSON.parse(localStorage.getItem("token"));
      user.token = token;
      localStorage.setItem("token", JSON.stringify(user));
    }
  }

  getUser() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user"));
    }
  }

  getUserId() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("token"))?.userId;
    }
  }

  setUser(token) {
    if (typeof window !== "undefined") {
      console.log(JSON.stringify(token));
      localStorage.setItem("token", JSON.stringify(token));
    }
  }

  removeUser() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }
}

export default new AuthTokenService();
