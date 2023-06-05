import React from 'react';
import { Box, Stack } from '@mui/material';

import Widgets from '../Widgets';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Utils } from '../../Libs';
import AppBarComponent from '../AppBar';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const UserLayout: React.FC<SectionProps> = (props: SectionProps) => {
  // Constructors
  const { pathname } = useLocation();
  const { content, screenTitle } = props;

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  React.useEffect(() => {
    const themeMode = Utils.getThemeMode();
    Utils.saveThemeMode(themeMode);
  }, []);

  return (
    <Stack direction="column" height="100vh">
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
