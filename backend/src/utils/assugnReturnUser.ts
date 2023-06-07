import { IUserDoc } from "../interfaces/user.interfaces";

const assignReturnUser = (user: IUserDoc) => {
  if (user?.bank)
    user.bank.accountNumber = user.bank.accountNumber.replace(
      /^\d{1,8}/,
      "********"
    );
  if (user?.security) {
    user.security.phonenumber = user.security.phonenumber.replace(
      /^\d{1,8}/,
      "********"
    );
    user.security.email = user.security.email.replace(
      /(\w{3})[\w.-]+@([\w.]+\w)/,
      "$1***@$2"
    );
  }
  return user;
};

export default assignReturnUser;
