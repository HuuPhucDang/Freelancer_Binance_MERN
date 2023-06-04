import React from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';

import Widgets from '../Widgets';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Utils } from '../../Libs';
import AdminSideBar from '../AdminSideBar';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const AdminLayout: React.FC<SectionProps> = (props: SectionProps) => {
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
    <Grid container sx={{ background: 'background.default', height: '100vh' }}>
      <Grid item xs={2}>
        <AdminSideBar />
      </Grid>
      <Grid item xs={10}>
        <Container
          maxWidth="lg"
          sx={{ height: '100%', maxHeight: '100vh', overflow: 'auto' }}
        >
          {content}
        </Container>
      </Grid>
      <Helmet>
        <title>{screenTitle ? screenTitle : 'Admin'}</title>
      </Helmet>
      <Widgets.Notification />
      <Widgets.Alert />
    </Grid>
  );
};

export default AdminLayout;