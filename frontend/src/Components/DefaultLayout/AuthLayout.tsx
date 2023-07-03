import React from 'react';
import _ from 'lodash';
// import { Helmet } from 'react-helmet-async';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router';

import Widgets from '../Widgets';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import AuthAppBar from '../AuthAppBar';

interface SectionProps {
  // content: JSX.Element;
  // currentPage?: string;
  // screenTitle?: string;
}

const AuthLayout: React.FC<SectionProps> = () => {
  // Constructors
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const userData = Utils.getUserData();
  const token = Utils.getAccessToken();
  // const { screenTitle, content } = props;

  React.useEffect(() => {
    if (token) {
      if (userData?.role === 'user') Utils.redirect(ROUTERS.REQUEST);
      else Utils.redirect(ROUTERS.TRANSACTION);
    }
  }, [pathname]);

  return (
    <Stack direction="column">
      <Box sx={{ background: 'background.default', flex: 1 }}>
        {isMd ? <AuthAppBar /> : null}
        <Stack
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          <Outlet />
          {/* {content} */}
        </Stack>
        <Widgets.Notification />
        <Widgets.Alert />
      </Box>
    </Stack>
  );
};

export default AuthLayout;
