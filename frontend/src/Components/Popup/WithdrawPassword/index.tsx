import * as React from 'react';
import _ from 'lodash';
import { Utils } from '../../../Libs';
import ChangeWithdrawPassword from './ChangeWithdrawPassword';
import ActiveWithdrawPassword from './ActiveWithdrawPassword';

interface IProps {
  open: boolean;
  onClose(): void;
}

const WithdrawPassword: React.FC<IProps> = ({ open = false, onClose }) => {
  const userData = Utils.getUserData();

  console.log(userData?.security?.isVerified);

  if (userData?.security?.isVerified)
    return <ChangeWithdrawPassword open={open} onClose={onClose} />;

  return <ActiveWithdrawPassword open={open} onClose={onClose} />;
};

export default WithdrawPassword;
