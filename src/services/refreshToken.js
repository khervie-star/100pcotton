// @/src/common/refreshToken.js
import mem from "mem";
import AuthTokenService from "./authToken.service";
// import second from 'first'

import toast from "react-hot-toast";
import { userActions } from "../redux/actions";

import { store } from "../redux/store";
import { axiosPublic } from "./axiosPublic";

// const { logout } = userActions;

const refreshTokenFn = async () => {
  try {
    const response = await axiosPublic.post("/refreshtoken", {});

    const { token } = response.data;
    console.log(response);
    console.log(token);

    // const user = AuthTokenService.getUser()

    // if (!user?.token) {
    //     store.dispatch(logout())
    // }

    AuthTokenService.updateLocalAccessToken(token);

    return response;
  } catch (error) {
    // localStorage.removeItem("user");
    store.dispatch(userActions.logout());
    toast("Session expired, please login again");
    console.log("error", error);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
