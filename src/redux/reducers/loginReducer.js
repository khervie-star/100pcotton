import { userConstants } from '../../utility/constants';

let token;
if (typeof window !== 'undefined') {
  token = JSON.parse(window.localStorage.getItem('token'));
}
const initialState = token ? { loggedIn: true, token } : { loggedIn: false, };

export function login(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.VERIFY_ADDRESS:
      return {
        ...state,
        loggingIn: false,
        loggingOut: false,
        loggedIn: false,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
      };

    case userConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loggingOut: true,
      };
    case userConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        loggedIn: false
      };
    case userConstants.LOGOUT_FAILURE:
      return {
        ...state,
        loggingOut: false,
        loggedIn: true
      };

    case userConstants.REFRESH_TOKEN:
      return {
        ...state,
        user: { ...user, token: action.accessToken }
      };

    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
      };
    // case userConstants.LOGOUT_SUCCESS:
    //   return {
    //     loggedIn: false,
    //     ...state,
    //   };
    // case userConstants.LOGOUT_FAILURE:
    //   return {
    //     ...state,
    //   };
    default:
      return state
  }
}