import React from 'react';
import { Box } from '@mui/material';

import Widgets from '../Widgets';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Utils } from '../../Libs';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const DefaultLayout: React.FC<SectionProps> = (props: SectionProps) => {
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
    <Box>
      <Helmet>
        <title>{screenTitle ? screenTitle : 'heyy,'}</title>
      </Helmet>
      {content}
      <Widgets.Notification />
      <Widgets.Alert />
    </Box>
  );
};

export default DefaultLayout;
