import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import {
  Toolbar,
  Grid,
  IconButton,
  Container,
  Box,
  Drawer,
  Link,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Import local
import { appBarStyles, AppBar } from './AppBar.styles';
import Assets from '@assets';
import { Utils } from '@libs';
import { ROUTERS, MENU_NAVIGATION } from '@/Constants';
import { CommonStyles } from '../Common';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import MaterialUISwitch from '../LayoutParts/SwitchTheme';

const AppBarComponent: React.FC = () => {
  // Constructors
  const pathname = useLocation().pathname;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Events
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Renders
  const _renderMenuItem = () =>
    _.map(MENU_NAVIGATION, (item) => {
      const isActive = item.value === pathname;
      const checkStyle = isActive
        ? CommonStyles.activeBorderEffect
        : CommonStyles.hoverBorderEffect;
      return (
        <Box
          key={item.label}
          sx={{
            ...checkStyle,
            fontFamily: 'Plus Jakarta Sans',
            fontSize: {
              xs: 24,
              sm: 16,
            },
            color: 'black!important',
          }}
          onClick={() => Utils.redirect(item.value)}
        >
          {item.label}
        </Box>
      );
    });

  const _renderMenuNav = useMemo(
    () => (
      <Grid
        item
        xs={7}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={CommonStyles.displayInDesktop}
      >
        <Box component="img" src={Assets.moneyIcon} />
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{
            flex: 1,
            background: '#D9D9D9',
            height: '25px',
            margin: '0 12px',
          }}
        >
          <Typography sx={{ fontSize: '12px', color: '#000' }}>
            EDUUSDT -1,18
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#000' }}>
            BTCUSDT -0,41
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#000' }}>
            IUDST -2,59
          </Typography>
        </Stack>
        <Button startIcon={<LoginIcon />} variant="outlined">
          Đăng ký
        </Button>
        <Button startIcon={<PersonIcon />} variant="outlined">
          Đăng nhập
        </Button>
      </Grid>
    ),
    [pathname, mobileOpen]
  );

  const _renderMainBar = () => (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={2} md={1}>
        <Link href={ROUTERS.HOME}>Logo</Link>
      </Grid>
      {_renderMenuNav}
      <Grid
        item
        xs={6}
        sm={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <IconButton
          focusRipple
          onClick={() => {
            Utils.saveThemeMode('light');
            window.location.reload();
          }}
        >
          <LightModeIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            Utils.saveThemeMode('dark');
            window.location.reload();
          }}
        >
          <DarkModeIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  const _renderDrawer = () => (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiPaper-root': {
          maxHeight: '100vh',
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        color="black"
        rowGap={5}
        sx={{ width: '100vw', py: 4, height: '80%' }}
      >
        <Link href={ROUTERS.HOME}>Logo</Link>
        {_renderMenuItem()}
        <Box mt="auto">
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ border: '1px solid black', color: 'black' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={appBarStyles}>
      {_renderDrawer()}
      <Container maxWidth="lg">
        <Toolbar>{_renderMainBar()}</Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarComponent;
