import React from 'react';
import _ from 'lodash';
import { Typography, Stack } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import 'react-alice-carousel/lib/alice-carousel.css';
// Import Local

const LatestPosts: React.FC = () => {
  // Constructors

  // Renders
  const _renderItem = () => (
    <Stack direction="column" marginTop={{ xs: '16px', md: '20px' }}>
      <Typography
        sx={{
          fontFamily: 'inherit',
          fontWeight: 400,
          fontSize: { md: 18, xs: 14 },
          lineHeight: '26px',
        }}
      >
        The support you need is just a click away.
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 500,
          fontSize: { xs: 10, md: 12 },
          lineHeight: '20px',
          mt: 2,
          pb: 2,
          borderBottom: '1px solid black',
        }}
      >
        Rebecca Liew • 7 minute read
      </Typography>
    </Stack>
  );

  return (
    <Stack
      flexDirection="column"
      sx={{
        fontFamily: 'Merriweather',
        background: '#F9F9F9',
        borderRadius: 2,
        padding: {
          xs: '24px 12px',
          md: '24px 20px',
        },
        marginTop: {
          xs: '40px',
          md: '0px',
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: 'inherit',
          fontWeight: 700,
          fontSize: { xs: 16, md: 24 },
          lineHeight: '30px',
        }}
      >
        Latest articles
      </Typography>
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      <Typography
        sx={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 600,
          fontSize: 14,
          lineHeight: '24px',
          mt: 2,
          cursor: 'pointer',
        }}
      >
        View all <NorthEastIcon sx={{ width: 15, height: 15 }} />
      </Typography>
    </Stack>
  );
};

export default LatestPosts;
