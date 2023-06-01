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
import { CommonStyles, LanguageSelect } from '../Common';
import PersonIcon from '@mui/icons-material/Person';
import { useTypedSelector } from '../../Reducers/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const AppBarComponent: React.FC = () => {
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
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
        xs={9.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={CommonStyles.displayInDesktop}
      >
        <Link
          href={ROUTERS.TRANSACTION}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={Assets.transactionDarkIcon}
            sx={{ width: '33px', height: '26px' }}
          />
        </Link>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{
            flex: 1,
            backgroundColor: 'background.newsHeader',
            height: '25px',
            margin: '0 8px',
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
        {isLogged ? (
          <>
            <Button
              variant="text"
              size="small"
              href={ROUTERS.RECHARGE}
              sx={{
                fontSize: '12px',
                paddingX: '8px',
                textTransform: 'unset',
                backgroundColor: 'background.burntSienna',
                color: 'text.secondary',
                marginRight: '10px',
                height: '26px',
              }}
            >
              Nạp
            </Button>
            <Button
              variant="text"
              size="small"
              href={ROUTERS.WITHDRAW_MONEY}
              sx={{
                fontSize: '12px',
                paddingX: '8px',
                textTransform: 'unset',
                backgroundColor: 'background.lightSilver',
                color: 'text.secondary',
                marginRight: '10px',
                height: '26px',
              }}
            >
              Rút
            </Button>
            <IconButton
              onClick={() => {
                Utils.redirect(ROUTERS.OVERVIEW);
              }}
              size="small"
            >
              <AccountCircleIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              variant="text"
              size="small"
              href={ROUTERS.SIGN_IN}
              sx={{
                fontSize: '12px',
                marginRight: '10px',
                paddingX: '8px',
                textTransform: 'unset',
                backgroundColor: 'background.newsHeader',
                color: 'text.secondary',
                height: '26px',
              }}
            >
              Đăng nhập
            </Button>
            <Button
              startIcon={<PersonIcon sx={{ fontSize: '14px !important' }} />}
              variant="text"
              size="small"
              href={ROUTERS.SIGN_UP}
              sx={{
                fontSize: '12px',
                paddingX: '8px',
                textTransform: 'unset',
                backgroundColor: 'background.burntSienna',
                color: 'text.secondary',
                height: '26px',
                marginRight: '10px',
              }}
            >
              Đăng ký
            </Button>
            <LanguageSelect
              selected=""
              onSelect={(newValue: string) => console.log(newValue)}
            />
          </>
        )}
      </Grid>
    ),
    [pathname, mobileOpen]
  );

  const _renderMainBar = () => {
    const isDarkMode = Utils.getThemeMode() === 'dark';
    return (
      <Grid container justifyContent="space-between" alignItems="center" columnSpacing={5}>
        <Grid item xs={2} md={1.25}>
          <Link
            href={ROUTERS.HOME}
            sx={{
              color: 'text.secondary',
              backgroundColor: 'background.lightSilver',
              fontSize: '12px',
              display: 'inline-flex',
              height: '28px',
              width: '58px',
              alignItems: 'center',
              padding: '0 6px',
            }}
          >
            Logo
          </Link>
        </Grid>
        {_renderMenuNav}
        <Grid
          item
          xs={6}
          md={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <IconButton
            focusRipple
            onClick={() => {
              if (isDarkMode) {
                Utils.saveThemeMode('light');
                window.location.reload();
              }
            }}
            disabled={!isDarkMode}
            size="small"
          >
            {isDarkMode ? (
              <Box component="img" src={Assets.lightIconDarkTheme} />
            ) : (
              <Box component="img" src={Assets.lightIconLightTheme} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              if (!isDarkMode) {
                Utils.saveThemeMode('dark');
                window.location.reload();
              }
            }}
            disabled={isDarkMode}
            size="small"
          >
            {isDarkMode ? (
              <Box component="img" src={Assets.darkIconDarkTheme} />
            ) : (
              <Box component="img" src={Assets.darkIconLightTheme} />
            )}
          </IconButton>
        </Grid>
      </Grid>
    );
  };

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
        <Link
          href={ROUTERS.HOME}
          sx={{
            color: 'text.primary',
            backgroundColor: 'background.lightSilver',
            fontSize: '12px',
            display: 'inline-block',
          }}
        >
          Logo
        </Link>
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

  const _renderSubHeader = () => {
    return (
      <Stack
        direction="row"
        sx={{
          width: '100%',
          alignItems: 'center',
          minHeight: '30px',
          background: 'palegoldenrod',
        }}
      >
        <PersonIcon sx={{ color: 'text.burntSienna', ml: '5em' }} />
        <Typography sx={{ color: '#000000', fontSize: '10px' }}>
          Đăng kí ngay - Nhận chiết khấu giao dịch lên tới 100 USD (dành cho
          người dùng đã xác minh)
        </Typography>
      </Stack>
    );
  };

  if (pathname === ROUTERS.SIGN_IN || pathname === ROUTERS.SIGN_UP) return null;

  return (
    <AppBar position="sticky" sx={appBarStyles}>
      <Container maxWidth="md">
        <Toolbar sx={{ minHeight: '40px !important' }}>
          {_renderMainBar()}
        </Toolbar>
        {_renderDrawer()}
      </Container>
      {_renderSubHeader()}
    </AppBar>
  );
};

export default AppBarComponent;
