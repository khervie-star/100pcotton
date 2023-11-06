import { tempDataConstants } from '../../utility/constants';

export function tempData(state = {}, action) {
    switch (action.type) {
        case tempDataConstants.ADD_DATA_TO_STORE:
            return {
                ...state,
                productData: action
            };
        case tempDataConstants.DELETE_DATA_FROM_STORE:
            return {
                productData: !action
            };
        case tempDataConstants.ADD_WALLET_DETAILS:
            return {
                ...state,
                walletDetails: action
            };
        case tempDataConstants.GET_TX_STATUS:
            return {
                ...state,
                txStatus: action
            };
        default:
            return state
    }
}