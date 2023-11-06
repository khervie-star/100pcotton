import { userService } from "../../services";
import { userConstants } from "../../utility/constants";
// import { toast } from 'react-toastify';
import Router from "next/router";
import toast from "react-hot-toast";
import AuthTokenService from "../../services/authToken.service";
import jwt_decode from "jwt-decode";
import authTokenService from "../../services/authToken.service";

export const userActions = {
  login,
  loginPopup,
  logout,
  privateLogout,
  register,
  verifyEmail,
  resend,
  getUser,
  updateUser,
  updateProfilePicture,
  updatePassword,
  createCart,
  getCart,
  updateCart,
  getSingleCartItem,
  updateShippingAddress,
  deleteSingleCartItem,
  // getEthPrice,
  sendResetMail,
  resetPassword,
  refreshToken,
};

function login(userLogin) {
  return (dispatch) => {
    dispatch(request(userLogin));

    const loginToast = toast.loading("Logging in...");
    userService.login(userLogin).then(
      (user) => {
        if (user.status === "PENDING") {
          dispatch(verify(user));
          toast("✋ Your account is not verified yet", {
            id: loginToast,
          });
          let userDetails;
          if (typeof window !== "undefined") {
            userDetails = localStorage.getItem("user");

            if (userDetails) {
              localStorage.setItem("user", JSON.stringify(user));
            } else {
              localStorage.setItem("user", JSON.stringify(user));
            }
          }
          Router.push(`/dashboard/account/confirm/${user.data.userId}`);
        } else {
          dispatch(success(user));
          authTokenService.setUser(user);
          toast.success("Logged In", {
            id: loginToast,
          });
          Router.push("/dashboard/");
        }
      },
      (error) => {
        dispatch(failure());
        toast.dismiss(loginToast);
        console.log(error);
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function verify(user) {
    return { type: userConstants.VERIFY_ADDRESS, user };
  }
  function failure() {
    return { type: userConstants.LOGIN_FAILURE };
  }
}

function loginPopup(userLogin) {
  return (dispatch) => {
    dispatch(request(userLogin));

    const loginToast = toast.loading("Logging in...");
    userService.login(userLogin).then(
      (user) => {
        if (user.status === "PENDING") {
          dispatch(verify(user));
          toast("✋ Your account is not verified yet", {
            id: loginToast,
          });
          let userDetails;
          if (typeof window !== "undefined") {
            userDetails = localStorage.getItem("user");

            if (userDetails) {
              localStorage.setItem("user", JSON.stringify(user));
            } else {
              localStorage.setItem("user", JSON.stringify(user));
            }
          }
        } else {
          dispatch(success(user));
          authTokenService.setUser(user);
          toast.success("Logged In", {
            id: loginToast,
          });
        }
      },
      (error) => {
        dispatch(failure());
        toast.dismiss(loginToast);
        console.log(error);
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function verify(user) {
    return { type: userConstants.VERIFY_ADDRESS, user };
  }
  function failure() {
    return { type: userConstants.LOGIN_FAILURE };
  }
}

function privateLogout() {
  return (dispatch) => {
    dispatch(request());

    userService.privateLogout().then(
      (loggedOut) => {
        dispatch(success(loggedOut));
        toast.success("👋 Logged out successfully");
        AuthTokenService.removeUser();
        Router.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error);
        console.log(error);
      }
    );
  };

  function request(loggedOut) {
    return { type: userConstants.LOGOUT_REQUEST, loggedOut };
  }
  function success(loggedOut) {
    return { type: userConstants.LOGOUT_SUCCESS, loggedOut };
  }
  function failure(error) {
    return { type: userConstants.LOGOUT_FAILURE, error };
  }
}

function logout() {
  AuthTokenService.removeUser();
  Router.push("/dashboard/");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));
    const signup = toast.loading("Creating Account...");

    userService.register(user).then(
      (registerationDetails) => {
        dispatch(success(registerationDetails));
        toast.success("Account created successfully", {
          id: signup,
        });
        let user;
        if (typeof window !== "undefined") {
          user = localStorage.getItem("user");

          if (user) {
            localStorage.setItem("user", JSON.stringify(registerationDetails));
          } else {
            localStorage.setItem("user", JSON.stringify(registerationDetails));
          }
        }
        setTimeout(() => toast("📨 Please verify your account"), 500);
        setTimeout(
          () =>
            Router.push(
              `/dashboard/account/confirm/${registerationDetails.data.userId}`
            ),
          1000
        );
      },
      (error) => {
        dispatch(failure());
        toast.dismiss(signup);
        console.log(error);
        // toast.error(error, {
        //   id: signup,
        // });
      }
    );
  };

  function request(registerationDetails) {
    return { type: userConstants.REGISTER_REQUEST, registerationDetails };
  }
  function success(registerationDetails) {
    return { type: userConstants.REGISTER_SUCCESS, registerationDetails };
  }
  function failure() {
    return { type: userConstants.REGISTER_FAILURE };
  }
}

function verifyEmail(verifyToken) {
  return (dispatch) => {
    dispatch(request(verifyToken));

    userService.verifyEmail(verifyToken).then(
      (verifiedEmail) => {
        dispatch(success(verifiedEmail));
        toast.success("Verification successful, you can now login");
        setTimeout(() => Router.push("/dashboard/account/login"), 2000);
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error;
      }
    );
  };

  function request(verifiedEmail) {
    return { type: userConstants.VERIFYEMAIL_REQUEST, verifiedEmail };
  }
  function success(verifiedEmail) {
    return { type: userConstants.VERIFYEMAIL_SUCCESS, verifiedEmail };
  }
  function failure(error) {
    return { type: userConstants.VERIFYEMAIL_FAILURE, error };
  }
}

function resend(email) {
  return (dispatch) => {
    dispatch(request(email));
    const resendAlert = toast.loading("Sending email...", {});
    userService.resend(email).then(
      (verifyToken) => {
        dispatch(success(verifyToken));
        toast.success("Verification link sent. Please check your mail", {
          id: resendAlert,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error);
        toast.error(error, {
          id: resendAlert,
        });
      }
    );
  };

  function request(verifyToken) {
    return { type: userConstants.RESENDEMAIL_REQUEST, verifyToken };
  }
  function success(verifyToken) {
    return { type: userConstants.REGISTER_SUCCESS, verifyToken };
  }
  function failure(error) {
    return { type: userConstants.RESENDEMAIL_FAILURE, error };
  }
}

function getUser(userId) {
  return (dispatch) => {
    dispatch(request());

    userService.getUser(userId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETUSER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETUSER_FAILURE, error };
  }
}

function updateUser(userDetails, userId) {
  return (dispatch) => {
    dispatch(request(userDetails));
    const updateToast = toast.loading("Updating...");

    userService.updateUser(userDetails, userId).then(
      (user) => {
        dispatch(success(user));
        toast.success("Updated", {
          id: updateToast,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, {
          id: updateToast,
        });
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATEUSER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATEUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATEUSER_FAILURE, error };
  }
}

function updateProfilePicture(profilePicture, userId) {
  return (dispatch) => {
    dispatch(request(profilePicture));

    userService.updateProfilePicture(profilePicture, userId).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error);
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATEUSER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATEUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATEUSER_FAILURE, error };
  }
}

function updatePassword(pass) {
  console.log(pass);
  return (dispatch) => {
    dispatch(request());
    const deleteToast = toast.loading("Updating password ");

    userService.updatePassword(pass).then(
      (userPassword) => {
        console.log();
        dispatch(success(userPassword));
        toast.success("Password changed", {
          id: deleteToast,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, {
          id: deleteToast,
        });
        console.log(error);
      }
    );
  };

  function request(userPassword) {
    return { type: userConstants.UPDATEPASSWORD_REQUEST, userPassword };
  }
  function success(userPassword) {
    return { type: userConstants.UPDATEPASSWORD_SUCCESS, userPassword };
  }
  function failure(error) {
    return { type: userConstants.UPDATEPASSWORD_FAILURE, error };
  }
}

function createCart(tokenDetails) {
  return (dispatch) => {
    dispatch(request(tokenDetails));
    const addToCartToast = toast.loading("Please wait...");
    userService.createCart(tokenDetails).then(
      (cart) => {
        dispatch(success(cart));
        toast.success("Added to cart", {
          id: addToCartToast,
        });
      },
      (error) => {
        dispatch(failure(error()));
        toast.error(error, {
          id: addToCartToast,
        });
      }
    );
  };

  function request(cart) {
    return { type: userConstants.CREATECART_REQUEST, cart };
  }
  function success(cart) {
    return { type: userConstants.CREATECART_SUCCESS, cart };
  }
  function failure(error) {
    return { type: userConstants.CREATECART_FAILURE, error };
  }
}

function updateCart(updateDetails, singleCartItemId) {
  return (dispatch) => {
    dispatch(request(updateDetails));
    const updateCartToast = toast.loading("Updating cart...", {
      autoClose: 5000,
    });
    userService.updateCart(updateDetails, singleCartItemId).then(
      (cart) => {
        dispatch(success(cart));
        toast.success("Cart updated", {
          id: updateCartToast,
        });
        Router.push("/dashboard/cart");
      },
      (error) => {
        dispatch(failure(error));
        toast.error(error, {
          id: updateCartToast,
        });
      }
    );
  };

  function request(cart) {
    return { type: userConstants.UPDATECART_REQUEST, cart };
  }
  function success(cart) {
    return { type: userConstants.UPDATECART_SUCCESS, cart };
  }
  function failure(error) {
    return { type: userConstants.UPDATECART_FAILURE, error };
  }
}

function getCart() {
  return (dispatch) => {
    dispatch(request());

    userService.getCart().then(
      (cartItems) => dispatch(success(cartItems)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETCART_REQUEST };
  }
  function success(cartItems) {
    return { type: userConstants.GETCART_SUCCESS, cartItems };
  }
  function failure(error) {
    return { type: userConstants.GETCART_FAILURE, error };
  }
}

function getSingleCartItem(cartItemId) {
  return (dispatch) => {
    dispatch(request());

    userService.getSingleCartItem(cartItemId).then(
      (singleCartItem) => dispatch(success(singleCartItem)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETSINGLECARTITEM_REQUEST };
  }
  function success(singleCartItem) {
    return { type: userConstants.GETSINGLECARTITEM_SUCCESS, singleCartItem };
  }
  function failure(error) {
    return { type: userConstants.GETSINGLECARTITEM_FAILURE, error };
  }
}

// function getEthPrice() {
//   return dispatch => {
//     dispatch(request());

//     userService.getUsdEthExchangeRateCoinGecko()
//       .then(
//         ethPrice => dispatch(success(ethPrice)),
//         error => dispatch(failure(error.toString()))
//       );
//   };

//   function request() { return { type: userConstants.GETETHPRICE_REQUEST } }
//   function success(singleCartItem) { return { type: userConstants.GETETHPRICE_SUCCESS, ethPrice } }
//   function failure(error) { return { type: userConstants.GETETHPRICE_FAILURE, error } }
// }

function deleteSingleCartItem(cartItemId) {
  return (dispatch) => {
    dispatch(request());
    const deleteItem = toast.loading("Deleting...", {
      autoClose: 5000,
    });

    userService.deleteSingleCartItem(cartItemId).then(
      (cartItems) => {
        dispatch(success(cartItems));
        toast.success("Deleted", {
          id: deleteItem,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, {
          id: deleteItem,
        });
      }
    );
  };

  function request() {
    return { type: userConstants.DELETESINGLECARTITEM_REQUEST };
  }
  function success(cartItems) {
    return { type: userConstants.DELETESINGLECARTITEM_SUCCESS, cartItems };
  }
  function failure(error) {
    return { type: userConstants.DELETESINGLECARTITEM_FAILURE, error };
  }
}

function updateShippingAddress(shippingAddress) {
  return (dispatch) => {
    dispatch(request(shippingAddress));
    const updateShippingToast = toast.loading("Updating...");
    userService.updateShippingAddress(shippingAddress).then(
      (user) => {
        dispatch(success(user));
        toast.success("Shipping details updated", {
          id: updateShippingToast,
        });
      },
      (error) => {
        dispatch(failure(error.toString()));
        console.log(error, error.response, error.message, "Error message here");
        toast.error(error, {
          id: updateShippingToast,
        });
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATEADDRESS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATEADDRESS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATEADDRESS_FAILURE, error };
  }
}

function sendResetMail(email) {
  return (dispatch) => {
    dispatch(request(email));
    const sendResetMailToast = toast.loading("Sending...", {});
    userService.sendResetMail(email).then(
      (mail) => {
        dispatch(success(mail));
        toast.success("A reset link has been sent to you", {
          id: sendResetMailToast,
        });
        setTimeout(() => {
          Router.push("/dashboard/account/login");
        }, 2000);
      },
      (error) => {
        dispatch(failure(error));
        toast.error(error, {
          id: sendResetMailToast,
        });
      }
    );
  };
  function request(mail) {
    return { type: userConstants.SEND_RESET_MAIL_REQUEST, mail };
  }
  function success(mail) {
    return { type: userConstants.SEND_RESET_MAIL_SUCCESS, mail };
  }
  function failure(error) {
    return { type: userConstants.SEND_RESET_MAIL_FAILURE, error };
  }
}

function resetPassword(password, passwordId) {
  return (dispatch) => {
    dispatch(request(password, passwordId));
    const resetPasswordToast = toast.loading("Updating...", {
      autoClose: 5000,
    });
    userService.resetPassword(password, passwordId).then(
      (passwordReset) => {
        dispatch(success(passwordReset));
        toast.success("Your password has been changed successfully", {
          id: resetPasswordToast,
        });
        // setTimeout(() => {
        //   Router.push("/dashboard/account/login")
        // }, 2000)
      },
      (error) => {
        dispatch(failure(error));
        toast.error(error, {
          id: resetPasswordToast,
        });
      }
    );
  };
  function request(passwordReset) {
    return { type: userConstants.RESETPASSWORD_REQUEST, passwordReset };
  }
  function success(passwordReset) {
    return { type: userConstants.RESETPASSWORD_SUCCESS, passwordReset };
  }
  function failure(error) {
    return { type: userConstants.RESETPASSWORD_FAILURE, error };
  }
}

function refreshToken(accessToken) {
  return (dispatch) => {
    dispatch(refreshToken(accessToken));
  };
  function refreshToken(accessToken) {
    return { type: userConstants.REFRESH_TOKEN, accessToken };
  }
}
