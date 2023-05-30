import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
} from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// Import locals
const RESPONSIVE = {
  0: { items: 1 },
  568: { items: 2 },
  600: { items: 2 },
  900: { items: 4 },
  1200: { items: 4 },
};
const AuthorsCarousel: React.FC = () => {
  // Constructors

  // Renders

  const _renderItem = () => (
    <Card
      sx={{
        width: { xs: 1, md: 185 },
        transition: '.4s transform linear, .2s all linear',
        ':hover': {
          boxShadow: 4,
          background: 'black',
          py: '1em',
          transform: 'translate(0px, -5px)',
          '& .MuiCardContent-root': {
            color: 'white!important',
          },
        },
      }}
    >
      <CardHeader avatar={<Avatar aria-label="recipe">R</Avatar>} />
      <CardContent>
        <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
          Alfred Hitchcock
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 10, mt: 2 }}>
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan
        </Typography>
      </CardContent>
    </Card>
  );

  const _renderCarouselItems = () => [
    _renderItem(),
    _renderItem(),
    _renderItem(),
    _renderItem(),
    _renderItem(),
  ];

  return (
    <Box
      sx={{
        '& .alice-carousel__wrapper': {
          py: 1,
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

export default AuthorsCarousel;
