import React from 'react';
import _ from 'lodash';
import { Typography, Stack } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import 'react-alice-carousel/lib/alice-carousel.css';
// Import Local

const TopTenAssessments: React.FC = () => {
  // Constructors

  // Renders
  const _renderItem = () => (
    <Typography
      sx={{
        fontFamily: 'inherit',
        fontWeight: 400,
        fontSize: { xs: 14, md: 18 },
        lineHeight: '26px',
        borderBottom: '1px solid black',
        p: '0px 0px 20px 0',
        marginTop: {
          xs: '16px',
          md: '20px',
        },
      }}
    >
      The support you need is just a click away.
    </Typography>
  );

  return (
    <Stack
      flexDirection="column"
      sx={{
        fontFamily: 'Merriweather',
        background: '#F9F7F2',
        borderRadius: 2,
        marginTop: '40px',
        padding: {
          xs: '24px 12px',
          md: '24px 20px',
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
        Top 10 Assessments
      </Typography>
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
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

export default TopTenAssessments;
