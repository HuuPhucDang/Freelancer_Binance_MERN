import React from 'react';
import { Box, Stack } from '@mui/material';

import Widgets from '../Widgets';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Utils } from '../../Libs';
import AppBarComponent from '../AppBar';
import { ROUTERS } from '../../Constants';
import { useTypedDispatch, useTypedSelector } from '../../Reducers/store';
import { AuthActions } from '../../Reducers/Actions';
import _ from 'lodash';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const { setLogged } = AuthActions;

const UserLayout: React.FC<SectionProps> = (props: SectionProps) => {
  // Constructors
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  const dispatch = useTypedDispatch();
  const token = Utils.getAccessToken();
  const userData = Utils.getUserData();
  const authRoutes = [
    ROUTERS.OVERVIEW,
    ROUTERS.CONNECT_BANK,
    ROUTERS.INVOICE,
    ROUTERS.RECHARGE,
    ROUTERS.SECURITY,
    ROUTERS.SUPPORT,
    ROUTERS.VERIFY,
    ROUTERS.WITHDRAW_MONEY,
  ];
  const { pathname } = useLocation();
  const { content, screenTitle } = props;

  React.useEffect(() => {
    const isAuthRouters = authRoutes.includes(pathname);
    if (!isLogged && isAuthRouters && token && userData) {
      dispatch(setLogged());
    } 
    // else {
    //   utils.redirect(ROUTERS.SIGN_IN);
    //   utils.clearCookies();
    // }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  React.useEffect(() => {
    const themeMode = Utils.getThemeMode();
    Utils.saveThemeMode(themeMode);
  }, []);

  return (
    <Stack direction="column">
      <AppBarComponent />
      <Box sx={{ background: 'background.default', flex: 1 }}>
        <Helmet>
          <title>{screenTitle ? screenTitle : 'Binance'}</title>
        </Helmet>
        {content}
        <Widgets.Notification />
        <Widgets.Alert />
      </Box>
    </Stack>
  );
};

export default UserLayout;
