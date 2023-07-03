import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Assets from '../../Assets';
import { Utils } from '../../Libs';
import { ROUTERS } from '../../Constants';
import { useLocation } from 'react-router';

const isHideNavBar = [ROUTERS.TRANSACTION, ROUTERS.HOME];

const NavigationBar = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const isDarkMode = Utils.getThemeMode() === 'dark';

  if (isHideNavBar.includes(pathname) || !isMd) return null;
  return (
    <Grid
      container
      sx={{
        position: 'sticky ',
        left: 0,
        bottom: 0,
        background: '#7D6F6F',
        height: '71px',
      }}
    >
      <Grid item xs={3}>
        <Stack
          direction="column"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            ':hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => Utils.redirect(ROUTERS.HOME)}
        >
          <Box
            component="img"
            src={isDarkMode ? Assets.homeLightIcon : Assets.homeDarkIcon}
            sx={{ height: '34px' }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              color: '#FFFFFF',
            }}
          >
            Trang chủ
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack
          direction="column"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            ':hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => Utils.redirect(ROUTERS.TRANSACTION)}
        >
          <Box
            component="img"
            src={isDarkMode ? Assets.circleLightIcon : Assets.circleDarkIcon}
            sx={{ height: '34px' }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              color: '#FFFFFF',
            }}
          >
            Giao dịch
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack
          direction="column"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            ':hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => Utils.redirect(ROUTERS.WALLET)}
        >
          <Box
            component="img"
            src={isDarkMode ? Assets.walletLightIcon : Assets.walletDarkIcon}
            sx={{ height: '34px' }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              color: '#FFFFFF',
            }}
          >
            Ví
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack
          direction="column"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            ':hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => Utils.redirect(ROUTERS.OVERVIEW)}
        >
          <Box
            component="img"
            src={isDarkMode ? Assets.profileLightIcon : Assets.profileLightIcon}
            sx={{ height: '34px' }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              color: '#FFFFFF',
            }}
          >
            Cá nhân
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NavigationBar;
