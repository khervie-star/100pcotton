import { tempDataConstants } from '../../utility/constants';


export const tempDataActions = {
    addData,
    deleteData,
    addWalletDetails,
    getTransactionStatus
}

// POST
function addData(data) {
    return dispatch => {
        dispatch(storeData(data));
    };

    function storeData(data) { return { type: tempDataConstants.ADD_DATA_TO_STORE, data } }
}

function deleteData(data) {
    return dispatch => {
        dispatch(deleteData(data))
    }

    function deleteData(data) { return { type: tempDataConstants.DELETE_DATA_FROM_STORE, data } }

}

function addWalletDetails(data) {
    return dispatch => {
        dispatch(addWalletDetails(data));
    };

    function addWalletDetails(data) { return { type: tempDataConstants.ADD_WALLET_DETAILS, data } }
}

function getTransactionStatus(txStatus) {
    return dispatch => {
        dispatch(getTransactionStatus(txStatus));
    };

    function getTransactionStatus(txStatus) { return { type: tempDataConstants.GET_TX_STATUS, txStatus } }
}


