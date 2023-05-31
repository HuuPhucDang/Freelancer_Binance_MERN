import React from 'react';
import _ from 'lodash';
import { Box, Grid, Typography } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// Import Local
import Assets from '@/Assets';
import { CommonColors } from '@/Themes';
// import { CommonColors } from '@/Themes';
const RESPONSIVE = {
  0: { items: 1 },
  568: { items: 2 },
  600: { items: 2 },
  900: { items: 4 },
  1200: { items: 4 },
};

const Blogs: React.FC = () => {
  // Constructors

  // Renders// Renders
  const _renderItem = (background: string, image: string) => (
    <Grid
      container
      sx={{
        position: 'relative',
        minHeight: 500,
        justifyContent: 'center',
        background,
      }}
    >
      <Box
        component="img"
        alt="headImage"
        src={image}
        sx={{
          width: 103,
          height: 145,
          position: 'absolute',
          left: '35%',
          top: -50,
        }}
      />
      <Grid item xs={7} sx={{ mt: '7em' }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          The support you need is just a click away.
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 500,
            mt: 2,
            pb: 2,
            textAlign: 'center',
            borderBottom: '1px solid black',
            mb: 2,
          }}
        >
          Rebecca Liew • 14 May 2023
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          The support you need is just a click away.
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 500,
            mt: 2,
            pb: 2,
            textAlign: 'center',
            borderBottom: '1px solid black',
            mb: 2,
          }}
        >
          Rebecca Liew • 14 May 2023
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          The support you need is just a click away.
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 500,
            mt: 2,
            pb: 2,
            textAlign: 'center',
            borderBottom: '1px solid black',
            mb: 2,
          }}
        >
          Rebecca Liew • 14 May 2023
        </Typography>
      </Grid>
      <Grid item xs={7} sx={{ mt: 'auto' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 14,
            lineHeight: '24px',
            mt: 2,
            textAlign: 'center',
          }}
        >
          View all <NorthEastIcon sx={{ width: 15, height: 15 }} />
        </Typography>
      </Grid>
    </Grid>
  );

  const _renderCarouselItems = () => [
    _renderItem('white', Assets.stressImage),
    _renderItem(CommonColors.orchidWhite, Assets.anxietyImage),
    _renderItem('white', Assets.depressionImage),
    _renderItem(CommonColors.orchidWhite, Assets.lonelinessImage),
  ];

  return (
    <Box
      sx={{
        '& .alice-carousel__wrapper': {
          paddingY: 1,
        },
        '& .alice-carousel__stage-item': {
          pt: '5em',
        },
      }}
    >
      <AliceCarousel
        keyboardNavigation={true}
        infinite={true}
        autoPlay={true}
        mouseTracking
        swipeExtraPadding={400}
        animationDuration={350}
        autoPlayInterval={3000}
        items={_renderCarouselItems()}
        responsive={RESPONSIVE}
        disableButtonsControls={true}
      />
    </Box>
  );
};

export default Blogs;
