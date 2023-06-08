import * as AuthAPI from './Auth.api';
import * as BankAPI from './Bank.api';
import * as SecurityAPI from './Security.api';
import * as UserAPI from './User.api';
import * as VerificationAPI from './Verification.api';

export default {
  ...AuthAPI,
  ...BankAPI,
  ...SecurityAPI,
  ...UserAPI,
  ...VerificationAPI,
};
