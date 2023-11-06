import { orderService } from "../../services";
import { orderConstants } from "../../utility/constants";

export const orderActions = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  trackOrder,
  sendTxHash,
  getAllTransactions,
  getSingleTx,
  sendTxForProposed,
  getProposedTx,
  getCollectedTx,
  validateCode,
};

// GET
function getAllOrders() {
  return (dispatch) => {
    dispatch(request());

    orderService.getAllOrders().then(
      (orders) => dispatch(success(orders)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: orderConstants.GETALL_ORDER_REQUEST };
  }
  function success(orders) {
    return { type: orderConstants.GETALL_ORDER_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.GETALL_ORDER_FAILURE, error };
  }
}

function getAllTransactions() {
  return (dispatch) => {
    dispatch(request());

    orderService.getAllTransactions().then(
      (transactions) => dispatch(success(transactions)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: orderConstants.GETALL_TX_REQUEST };
  }
  function success(transactions) {
    return { type: orderConstants.GETALL_TX_SUCCESS, transactions };
  }
  function failure(error) {
    return { type: orderConstants.GETALL_TX_FAILURE, error };
  }
}

function getSingleTx(hash) {
  return (dispatch) => {
    dispatch(request(hash));

    orderService.getSingleTx(hash).then(
      (trx) => dispatch(success(trx)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(hash) {
    return { type: orderConstants.GETSINGLE_TX_REQUEST, hash };
  }
  function success(trx) {
    return { type: orderConstants.GETSINGLE_TX_SUCCESS, trx };
  }
  function failure(error) {
    return { type: orderConstants.GETSINGLE_TX_FAILURE, error };
  }
}

function getSingleOrder(id) {
  return (dispatch) => {
    dispatch(request());

    orderService.getSingleOrder(id).then(
      (singleOrder) => dispatch(success(singleOrder)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: orderConstants.GETSINGLE_ORDER_REQUEST };
  }
  function success(singleOrder) {
    return { type: orderConstants.GETSINGLE_ORDER_SUCCESS, singleOrder };
  }
  function failure(error) {
    return { type: orderConstants.GETSINGLE_ORDER_FAILURE, error };
  }
}

// POST
function createOrder(orderDetails) {
  return (dispatch) => {
    dispatch(request(orderDetails));

    orderService.createOrder(orderDetails).then(
      (order) => {
        dispatch(success(order));
      },
      (error) => {
        dispatch(failure(error()));
        console.log(error, error.error);
      }
    );
  };

  function request(order) {
    return { type: orderConstants.CREATE_ORDER_REQUEST, order };
  }
  function success(order) {
    return { type: orderConstants.CREATE_ORDER_SUCCESS, order };
  }
  function failure(error) {
    return { type: orderConstants.CREATE_ORDER_FAILURE, error };
  }
}

// POST
function trackOrder(trackingId) {
  return (dispatch) => {
    dispatch(request(trackingId));

    orderService.trackOrder(trackingId).then(
      (orderLocation) => {
        dispatch(success(orderLocation));
      },
      (error) => {
        dispatch(failure(error));
        console.log(error, error.error, error.response);
      }
    );
  };

  function request(orderLocation) {
    return { type: orderConstants.TRACK_ORDER_REQUEST, orderLocation };
  }
  function success(orderLocation) {
    return { type: orderConstants.TRACK_ORDER_SUCCESS, orderLocation };
  }
  function failure(error) {
    return { type: orderConstants.TRACK_ORDER_FAILURE, error };
  }
}

function sendTxHash(hash) {
  return (dispatch) => {
    dispatch(request(hash));

    orderService.sendTxHash(hash).then(
      (hashStatus) => {
        dispatch(success(hashStatus));
      },
      (error) => {
        dispatch(failure(error));
        console.log(error, error.error, error.response);
      }
    );
  };

  function request(hash) {
    return { type: orderConstants.SEND_TX_HASH_REQUEST, hash };
  }
  function success(hashStatus) {
    return { type: orderConstants.SEND_TX_HASH_SUCCESS, hashStatus };
  }
  function failure(error) {
    return { type: orderConstants.SEND_TX_HASH_FAILURE, error };
  }
}

function sendTxForProposed(details) {
  return (dispatch) => {
    dispatch(request(details));

    orderService.sendTxForProposed(details).then(
      (proposedStatus) => {
        dispatch(success(proposedStatus));
      },
      (error) => {
        dispatch(failure(error));
        console.log(error, error.error, error.response);
      }
    );
  };

  function request(details) {
    return { type: orderConstants.SEND_TX_HASH_REQUEST, details };
  }
  function success(proposedStatus) {
    return { type: orderConstants.SEND_TX_HASH_SUCCESS, proposedStatus };
  }
  function failure(proposedError) {
    return { type: orderConstants.SEND_TX_HASH_FAILURE, proposedError };
  }
}

function getProposedTx() {
  return (dispatch) => {
    dispatch(request());

    orderService.getProposedTx().then(
      (proposedTransactions) => dispatch(success(proposedTransactions)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: orderConstants.GETALL_PROPOSED_TX_REQUEST };
  }
  function success(proposedTransactions) {
    return {
      type: orderConstants.GETALL_PROPOSED_TX_SUCCESS,
      proposedTransactions,
    };
  }
  function failure(proposedError) {
    return { type: orderConstants.GETALL_PROPOSED_TX_FAILURE, proposedError };
  }
}

function getCollectedTx() {
  return (dispatch) => {
    dispatch(request());

    orderService.getCollectedTx().then(
      (collected) => dispatch(success(collected)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: orderConstants.GETALL_COLLECTED_TX_REQUEST };
  }
  function success(collected) {
    return { type: orderConstants.GETALL_COLLECTED_TX_SUCCESS, collected };
  }
  function failure(collectedError) {
    return { type: orderConstants.GETALL_COLLECTED_TX_FAILURE, collectedError };
  }
}

function validateCode(code) {
  return (dispatch) => {
    dispatch(request(code));

    orderService.validateCode(code).then(
      (validate_success) => dispatch(success(validate_success)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: orderConstants.VALIDATE_CODE_REQUEST };
  }
  function success(validate_success) {
    return { type: orderConstants.VALIDATE_CODE_SUCCESS, validate_success };
  }
  function failure(error) {
    return { type: orderConstants.VALIDATE_CODE_FAILURE, error };
  }
}
