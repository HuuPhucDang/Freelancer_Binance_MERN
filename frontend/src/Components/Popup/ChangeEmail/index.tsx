import * as React from 'react';

import _ from 'lodash';

import { Utils } from '@/Libs';
import ActiveEmail from './ActiveEmail';
interface IProps {
  open: boolean;
  onClose(): void;
}

const ChangeEmail: React.FC<IProps> = ({ open = false, onClose }) => {
  const userData = Utils.getUserData();

  if (userData?.security?.email)
    return <ChangeEmail open={open} onClose={onClose} />;
  return <ActiveEmail open={open} onClose={onClose} />;
};

export default ChangeEmail;
