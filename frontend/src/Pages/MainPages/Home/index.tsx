import React from 'react';
import { Container, Box, Typography, Grid, Grow } from '@mui/material';

// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { CommonStyles } from '@/Components/Common';

const Home: React.FC = () => {
  // Constructors

  // Renders
  const _renderImage = () => (
    <Grid
      container
      justifyContent="center"
      sx={{
        width: { md: 0.5, xs: 1 },
      }}
    >
      {/* <Grid item xs={12} textAlign="center">
        <Box
          component="img"
          alt="mobile"
          src={Assets.rateStartYellowImage}
          sx={{ width: 293, height: 96 }}
        />
      </Grid>
      <Grid item xs={12} md={6} textAlign="right">
        <Box
          component="img"
          alt="mobile"
          src={Assets.appStoreFullIcon}
          sx={{
            height: 80,
            // objectFit: 'contain',
            cursor: 'pointer',
            position: 'relative',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} textAlign="left">
        <Box
          component="img"
          alt="mobile"
          src={Assets.playFullIcon}
          sx={{
            height: 80,
            // objectFit: 'contain',
            cursor: 'pointer',
            position: 'relative',
          }}
        />
      </Grid> */}
    </Grid>
  );

  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="md"
        sx={{ my: { xs: '3em', md: '5em', textAlign: '-webkit-center' } }}
      >
        {/* <Box
          sx={{
            width: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Grow in timeout={1000}>
            <Box
              component="img"
              alt="mobile"
              src={Assets.mobileGif}
              sx={{
                width: 550,
                // height: 600,
                objectFit: 'contain',
                position: 'absolute',
                right: 0,
                ...CommonStyles.displayInDesktop,
              }}
            />
          </Grow>
          <Grow in timeout={500}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: 32, md: 48 },
                lineHeight: '70px',
                width: { md: 0.5, xs: 1 },
                px: { xs: 4, md: 0 },
                textAlign: 'center',
                mb: 3,
              }}
            >
              Your{' '}
              <Box component="b">
                24x7{' '}
                <Box
                  component="span"
                  sx={{
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '5px',
                      backgroundImage: `url(${Assets.underlineImage})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'round',
                      transition: 'all 0.5s',
                      bottom: -8,
                      left: 0,
                      width: 1,
                    },
                  }}
                >
                  personal Guide
                </Box>
              </Box>{' '}
              <br /> to a healthier happier mind
            </Typography>
          </Grow>
          <Grow in timeout={1000}>
            <Box
              component="img"
              alt="mobile"
              src={Assets.mobileGif}
              sx={{
                // height: 400,
                mb: 2,
                width: 1,
                objectFit: 'contain',
                ...CommonStyles.displayInMobile,
              }}
            />
          </Grow>
          <Grow in timeout={1500}>
            {_renderImage()}
          </Grow>
        </Box> */}
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle='heyy,' />;
};

export default Home;
