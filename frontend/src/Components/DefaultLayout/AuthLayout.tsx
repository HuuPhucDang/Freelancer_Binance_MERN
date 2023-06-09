import React from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import { Box, Stack } from '@mui/material';

import Widgets from '../Widgets';

interface SectionProps {
  content: JSX.Element;
  currentPage?: string;
  screenTitle?: string;
}

const AuthLayout: React.FC<SectionProps> = (props: SectionProps) => {
  // Constructors
  const { screenTitle, content } = props;

  return (
    <Stack direction="column">
      <Box sx={{ background: 'background.default', flex: 1 }}>
        <Helmet>
          <title>{screenTitle ? screenTitle : 'Binance'}</title>
        </Helmet>
        <Stack
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
        </Stack>
        <Widgets.Notification />
        <Widgets.Alert />
      </Box>
    </Stack>
  );
};

export default AuthLayout;
