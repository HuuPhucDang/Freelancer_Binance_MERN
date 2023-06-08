import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import WidgetReducer from './Widget.reducer';
import AuthReducer from './Auth.reducer';
import BankReducer from './Bank.reducer';
import SecurityReducer from './Security.reducer';
import UserReducer from './User.reducer';
import VerificationReducer from './Verification.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    ROUTER: connectRouter(history),
    WIDGET: WidgetReducer,
    AUTH: AuthReducer,
    BANK: BankReducer,
    SECURITY: SecurityReducer,
    USER: UserReducer,
    VERIFICATION: VerificationReducer,
  });
export default createRootReducer;
