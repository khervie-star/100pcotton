import { combineReducers } from 'redux';

import { auction } from './auctionReducer';
import { login } from './loginReducer';
import { orders } from './orderReducer';
import { registration } from './registrationReducer';
import { tempData } from './tempDataReducer';
import { token } from './tokenReducer';
import { users } from './userReducer';

const rootReducer = combineReducers({
  login,
  registration,
  users,
  auction,
  token,
  tempData,
  orders,
});

export default rootReducer;