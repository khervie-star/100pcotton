import { userConstants } from '../../utility/constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.VERIFYEMAIL_REQUEST:
      return {
        verifying: true,
        verificationFail: false,
      };
    case userConstants.VERIFYEMAIL_SUCCESS:
      return {
        ...state,
        verifying: false,
        verificationFail: false,
        verifiedEmail: action.verifiedEmail
      };
    case userConstants.VERIFYEMAIL_FAILURE:
      return {
        verifying: false,
        verificationFail: action.error,
        verificationFail: true,
      };


    case userConstants.RESENDEMAIL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.RESENDEMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        verifyToken: action.verifyToken,
      };
    case userConstants.RESENDEMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    case userConstants.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      };
    case userConstants.GETUSER_FAILURE:
      return {
        error: action.error,
        loading: false
      };


    case userConstants.UPDATEUSER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.UPDATEUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      };
    case userConstants.UPDATEUSER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.UPDATEPASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.UPDATEPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case userConstants.UPDATEPASSWORD_FAILURE:
      return {
        ...state,
        loading: false
      };


    case userConstants.CREATECART_REQUEST:
      return {
        ...state,
        addingToCart: true
      };
    case userConstants.CREATECART_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        cart: action
      };
    case userConstants.CREATECART_FAILURE:
      return {
        error: action.error
      };


    case userConstants.UPDATECART_REQUEST:
      return {
        ...state,
        updatingCart: true
      };
    case userConstants.UPDATECART_SUCCESS:
      return {
        ...state,
        updatingCart: false,
        updatedCart: true,
        cart: action
      };
    case userConstants.UPDATECART_FAILURE:
      return {
        ...state,
        updatingCart: false,
        updatedCart: true,
        cart: action,
        error: action.error
      };



    case userConstants.GETCART_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETCART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.cartItems
      };
    case userConstants.GETCART_FAILURE:
      return {
        error: action.error
      };

    case userConstants.GETSINGLECARTITEM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETSINGLECARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        singleCartItem: action.singleCartItem
      };
    case userConstants.GETSINGLECARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.GETETHPRICE_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case userConstants.GETETHPRICE_SUCCESS:
      return {
        ...state,
        fetching: false,
        ethPrice: action.ethPrice
      };
    case userConstants.GETETHPRICE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };

    case userConstants.UPDATEADDRESS_REQUEST:
      return {
        ...state,
        updating: true
      };
    case userConstants.UPDATEADDRESS_SUCCESS:
      return {
        ...state,
        updating: false,
        user: action.user
      };
    case userConstants.UPDATEADDRESS_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error
      };



    case userConstants.DELETESINGLECARTITEM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.DELETESINGLECARTITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.cartItems
      };
    case userConstants.DELETESINGLECARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.SEND_RESET_MAIL_REQUEST:
      return {
        ...state,
        sending: true
      };
    case userConstants.SEND_RESET_MAIL_SUCCESS:
      return {
        ...state,
        sending: false,
        mail: action.mail
      };
    case userConstants.SEND_RESET_MAIL_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error
      };

    case userConstants.RESETPASSWORD_REQUEST:
      return {
        ...state,
        updating: true
      };
    case userConstants.RESETPASSWORD_SUCCESS:
      return {
        ...state,
        updating: false,
        passwordReset: action.passwordReset
      };
    case userConstants.RESETPASSWORD_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.error
      };




    default:
      return state
  }
}