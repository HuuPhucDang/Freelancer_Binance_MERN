import { Box, Container, Typography, Stack } from '@mui/material';
import Assets from '@assets';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: { xs: '3em', md: '5em' },
        fontFamily: 'Plus Jakarta Sans',
      }}
    >
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          textAlign="center"
          fontSize="65px"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: '40px',
              md: '65px',
            },
          }}
        >
          Oops...
        </Typography>
        <Stack direction="row" justifyContent="center" marginTop="60px">
          <Box
            component="img"
            src={Assets.notFoundIll}
            alt="Not found illustrator"
            width={368}
            height={366}
            sx={{
              width: '100%',
              maxWidth: {
                xs: '219px',
                md: '368px',
              },
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Stack>
        <Typography
          variant="h6"
          textAlign="center"
          fontSize={{
            xs: '24px',
            md: '36px',
          }}
          fontWeight={300}
          marginTop="60px"
        >
          Looks like a <b>404!</b> Sorry!
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          fontSize={{ xs: '16px', md: '24px' }}
          fontWeight={400}
          fontFamily="Plus Jakarta Sans"
          marginTop={{
            xs: '12px',
            md: '29px',
          }}
        >
          Take a deep breath and go back :)
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFound;
