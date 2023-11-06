import { orderConstants } from "../../utility/constants";

export function orders(state = {}, action) {
  switch (action.type) {
    case orderConstants.GETALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case orderConstants.GETALL_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case orderConstants.GETALL_TX_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETALL_TX_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.transactions,
      };
    case orderConstants.GETALL_TX_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case orderConstants.GETSINGLE_TX_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETSINGLE_TX_SUCCESS:
      return {
        ...state,
        loading: false,
        trx: action.trx,
      };
    case orderConstants.GETSINGLE_TX_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case orderConstants.GETSINGLE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETSINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleOrder: action.singleOrder,
      };
    case orderConstants.GETSINGLE_ORDER_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case orderConstants.CREATE_ORDER_REQUEST:
      return {
        ...state,
        ordering: true,
      };
    case orderConstants.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        ordering: false,
        ordered: true,
        order: action,
      };
    case orderConstants.CREATE_ORDER_FAILURE:
      return {
        ...state,
        ordering: false,
        ordered: false,
        error: action.error,
      };

    case orderConstants.TRACK_ORDER_REQUEST:
      return {
        ...state,
        tracking: true,
      };
    case orderConstants.TRACK_ORDER_SUCCESS:
      return {
        ...state,
        tracking: false,
        orderLocation: action.orderLocation,
      };
    case orderConstants.TRACK_ORDER_FAILURE:
      return {
        ...state,
        tracking: false,
        error: action.error,
      };

    case orderConstants.SEND_TX_HASH_REQUEST:
      return {
        ...state,
        sendingHash: true,
      };
    case orderConstants.SEND_TX_HASH_SUCCESS:
      return {
        ...state,
        sendingHash: false,
        hashStatus: action.hashStatus,
      };
    case orderConstants.SEND_TX_HASH_FAILURE:
      return {
        ...state,
        sendingHash: false,
        sendHashError: action.error,
      };

    case orderConstants.SEND_TX_PROPOSED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.SEND_TX_PROPOSED_SUCCESS:
      return {
        ...state,
        loading: false,
        proposedStatus: action.proposedStatus,
      };
    case orderConstants.SEND_TX_PROPOSED_FAILURE:
      return {
        ...state,
        loading: false,
        proposedError: action.error,
      };

    case orderConstants.GETALL_PROPOSED_TX_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETALL_PROPOSED_TX_SUCCESS:
      return {
        ...state,
        loading: false,
        proposedTransactions: action.proposedTransactions,
      };
    case orderConstants.GETALL_PROPOSED_TX_FAILURE:
      return {
        ...state,
        loading: false,
        proposedError: action.proposedError,
      };

    case orderConstants.GETALL_COLLECTED_TX_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETALL_COLLECTED_TX_SUCCESS:
      return {
        ...state,
        loading: false,
        collected: action.collected,
      };
    case orderConstants.GETALL_COLLECTED_TX_FAILURE:
      return {
        ...state,
        loading: false,
        collectedError: action.collectedError,
      };

    case orderConstants.VALIDATE_CODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.VALIDATE_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        validate_success: action.validate_success,
      };
    case orderConstants.VALIDATE_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        validate_error: action.validate_error,
      };

    default:
      return state;
  }
}
