import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";
import { BehaviorSubject } from "rxjs";
import AuthTokenService from "./authToken.service";
import { axiosPublic } from "./axiosPublic";
import { axiosPrivate } from "./interceptor";

const coingeckoExchangeApi = "https://coingecko.p.rapidapi.com/simple/price";

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  privateLogout,
  register,
  verifyEmail,
  getUser,
  updateUser,
  updateProfilePicture,
  updatePassword,
  createCart,
  getCart,
  getSingleCartItem,
  updateCart,
  updateShippingAddress,
  deleteSingleCartItem,
  resend,
  getUsdEthExchangeRateCoinGecko,
  sendResetMail,
  resetPassword,
};

// function loginOld(userLogin) {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userLogin)
//   };

//   return fetch(`${ApiUrl}/login`, requestOptions)
//     .then(handleResponse)
//     .then(user => {
//       // store user details and jwt token in local storage to keep user logged in between page refreshes
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem('user', JSON.stringify(user));
//       }
//       return user;
//     });
// }

function login(userLogin) {
  return (
    axiosPublic
      .post(`/login`, userLogin)
      .then(handleAxiosResponse)
      // .then(token => {
      //   // store user details and jwt token in local storage to keep user logged in between page refreshes

      //   return token;
      // })
      .catch((error) => handleLoginError(error, email))
  );
}

function privateLogout() {
  return axiosPrivate
    .post(`/logout`, {})
    .then(handleAxiosResponse)
    .catch(handleError);
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("user");
  }
  Router.push("/dashboard");
  // return { type: userConstants.LOGOUT };
}

function register(user) {
  return axiosPublic
    .post(`/register`, user)
    .then(handleAxiosResponse)
    .catch((error) => handleSignupError(error));
}

function verifyEmail(verifyToken) {
  return axiosPublic
    .post(`/confirm`, verifyToken)
    .then(handleAxiosResponse)
    .catch(handleError);
}

// User
function getUser(userId) {
  return axiosPrivate
    .get(`/users/${userId}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function updateUser(userDetails, userId) {
  return axiosPrivate
    .patch(`/users/updateUser/${userId}`, userDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function updateProfilePicture(userDetails, userId) {
  return axiosPrivate
    .patch(`/users/updateUser/${userId}`, userDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function updatePassword(password) {
  return axiosPrivate
    .patch(`/users/updatePassword`, password)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function resend(data) {
  return axiosPublic
    .post(`/resendOtp`, data)
    .then(handleAxiosResponse)
    .catch(handleError);
}

//Cart
function createCart(tokenDetails) {
  return axiosPrivate
    .post(`/cart`, tokenDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getCart() {
  return axiosPrivate.get(`/cart`).then(handleAxiosResponse).catch(handleError);
}

function updateCart(updateDetails, cartItemId) {
  return axiosPrivate
    .patch(`/cart/${cartItemId}`, updateDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getSingleCartItem(cartItemId) {
  return axiosPrivate
    .get(`/cart/${cartItemId}/single`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function deleteSingleCartItem(cartItemId) {
  return axiosPrivate
    .delete(`/cart/${cartItemId}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function updateShippingAddress(shippingDetails) {
  return axiosPrivate
    .patch(`/users/change/shippingAddress`, shippingDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function sendResetMail(email) {
  return axiosPrivate
    .post(`/resetPassword`, email)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function resetPassword(password, passwordId) {
  return axiosPrivate
    .patch(`/updatepassword/${passwordId}`, password)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getUsdEthExchangeRateCoinGecko() {
  const params = { ids: "usd", vs_currencies: "eth" };
  const headers = {
    "X-RapidAPI-Key": "c762941e8bmsh0473372a4143febp191ce1jsn5c650c242a11",
    "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  };
  return axios
    .get(`${coingeckoExchangeApi}`, params, { headers })
    .then(handleAxiosResponse)
    .catch(handleError);
}

function handleAxiosResponse(response) {
  const data = response && response.data;

  return data;
}

function handleError(error) {
  // console.log(error, error.response, error.error, error.message, "Error message")

  var err;

  if (error.response) {
    err = error.response.data;
  } else {
    err = error.message;
  }

  return Promise.reject(err);
}

function handleLoginError(error, email) {
  console.log(error, email);
  if (error.response) {
    if (error?.response.status == 403) {
      toast("✋ Your account is not verified yet");
    } else {
      toast.error(error.response.data.error);
    }
  } else {
    toast.error(error.message);
    console.log(error.message);
  }
  return Promise.reject(error);
}

function handleSignupError(error) {
  console.log(error);
  if (error.response) {
    toast.error(error.response.data.error);
  } else {
    // err = error.message;
    toast.error(error.message);
    console.log(error.message);
  }
  return Promise.reject(error);
}
