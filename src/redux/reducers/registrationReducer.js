import { userConstants } from '../../utility/constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {
        registering: false,
        registerationDetails: action.registerationDetails
      };
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}