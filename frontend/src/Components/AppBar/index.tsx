import React from 'react';
import _ from 'lodash';
import {
  Toolbar,
  Grid,
  IconButton,
  Box,
  Drawer,
  Link,
  Button,
  Typography,
  Stack,
  List,
  ListItem,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
// Import local
import { appBarStyles, AppBar } from './AppBar.styles';
import Assets from '@assets';
import { Utils } from '@libs';
import { ROUTERS } from '@/Constants';
import { LanguageSelect, Slider } from '../Common';
import PersonIcon from '@mui/icons-material/Person';
import { useTypedSelector } from '../../Reducers/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const volatilityItems = [
  'EDUUSDT -1,18',
  'BTCUSDT -0,41',
  'IUDST -2,59',
  'EDUUSDT -1,18',
  'BTCUSDT -0,41',
  'IUDST -2,59',
  'EDUUSDT -1,18',
  'BTCUSDT -0,41',
  'IUDST -2,59',
  'IUDST -2,59',
  'EDUUSDT -1,18',
  'BTCUSDT -0,41',
  'IUDST -2,59',
];
const AppBarComponent: React.FC = () => {
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  // Constructors
  const [language, setLanguage] = React.useState<string>('vietnam');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isDarkMode = Utils.getThemeMode() === 'dark';

  const onSignOut = () => {
    console.log('sign out');
  };

  const handleChangeLanguage = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setLanguage(newAlignment);
  };

  const _renderMainBar = () => {
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        columnSpacing={0}
        spacing={{
          xs: 1,
          md: 0,
        }}
      >
        <Grid item xs={2} sm={2.5} md={1} lg={2}>
          <Stack direction="row" alignItems="center">
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
            <Link
              href={ROUTERS.TRANSACTION}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <Box
                component="img"
                src={Assets.transactionDarkIcon}
                sx={{ width: '33px', height: '26px' }}
              />
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={8} sm={7} md={6} lg={6}>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            justifyContent={{
              xs: 'center',
              md: 'flex-end',
            }}
            width="100%"
          >
            <Link
              href={ROUTERS.TRANSACTION}
              sx={{
                display: {
                  xs: 'flex',
                  lg: 'none',
                },
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
              justifyContent="flex-end"
              sx={{
                flex: 1,
                backgroundColor: 'background.newsHeader',
                height: '25px',
                margin: '0 6px',
                maxWidth: "80%",
              }}
            >
              <Slider
                items={volatilityItems}
                itemSx={{
                  fontSize: '12px',
                  color: '#000',
                  textAlign: 'center',
                }}
                slidersPerView={3}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={2} sm={2.5} md={5} lg={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ xs: 'none', md: 'flex' }}
          >
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
                    minWidth: '59px',
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
                    minWidth: '59px',
                  }}
                >
                  Rút
                </Button>
                <IconButton
                  onClick={() => {
                    Utils.redirect(ROUTERS.OVERVIEW);
                  }}
                  size="small"
                  sx={{ padding: 0, marginRight: '10px' }}
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
                  startIcon={
                    <PersonIcon sx={{ fontSize: '14px !important' }} />
                  }
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
              </>
            )}
            <LanguageSelect
              selected=""
              onSelect={(newValue: string) => console.log(newValue)}
            />
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
              sx={{
                padding: 0,
                marginRight: '10px',
                marginLeft: '10px',
              }}
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
              sx={{ padding: 0 }}
            >
              {isDarkMode ? (
                <Box component="img" src={Assets.darkIconDarkTheme} />
              ) : (
                <Box component="img" src={Assets.darkIconLightTheme} />
              )}
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            display={{ xs: 'flex', md: 'none' }}
          >
            <IconButton
              size="small"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ marginLeft: '10px' }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    );
  };
  const _renderSubHeader = () => {
    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          minHeight: '30px',
          background: 'palegoldenrod',
        }}
      >
        <Stack
          direction="row"
          sx={{
            maxWidth: '852px',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isLogged ? (
            <Slider
              items={[
                'Nhận chiết khấu giao dịch lên tới 100 USD khi đăng ký thành công với mã mời (dành cho người dùng đã xác minh)',
                'Nhận chiết khấu giao dịch lên tới 100 USD khi đăng ký thành công với mã mời (dành cho người dùng đã xác minh)',
                'Nhận chiết khấu giao dịch lên tới 100 USD khi đăng ký thành công với mã mời (dành cho người dùng đã xác minh)',
              ]}
              itemSx={{
                fontSize: '10px',
                color: '#000000',
                textAlign: 'center',
              }}
              slidersPerView={1}
              speed={4000}
            />
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <PersonIcon sx={{ color: 'text.burntSienna', mr: '6px' }} />
              <Typography sx={{ color: '#000000', fontSize: '10px', textAlign: 'center' }}>
                <Link href={ROUTERS.SIGN_UP}>Đăng kí ngay</Link> - Nhận chiết
                khấu giao dịch lên tới 100 USD khi đăng ký thành công với mã mời (dành cho người dùng đã xác minh)
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  };

  return (
    <AppBar position="sticky" sx={appBarStyles}>
      <Box>
        <Toolbar
          sx={{
            padding: '0 10px !important',
            minHeight: '40px !important',
          }}
        >
          {_renderMainBar()}
        </Toolbar>
        <Drawer anchor="right" open={open} onClose={() => setAnchorEl(null)}>
          <List sx={{ minWidth: '220px' }}>
            {isLogged ? (
              <>
                <ListItem>
                  <Link
                    href={ROUTERS.RECHARGE}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Nạp
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={ROUTERS.WITHDRAW_MONEY}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Rút
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={ROUTERS.OVERVIEW}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Tổng quan
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    onClick={() => onSignOut()}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Đăng xuất
                  </Link>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Link
                    href={ROUTERS.SIGN_IN}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Đăng nhập
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href={ROUTERS.SIGN_UP}
                    sx={{ color: 'text.primary', fontSize: '12px' }}
                  >
                    Đăng ký
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <ToggleButtonGroup
                color="primary"
                value={language}
                exclusive
                onChange={handleChangeLanguage}
                aria-label="Platform"
                sx={{
                  width: '100%',
                }}
              >
                <ToggleButton
                  value="english"
                  sx={{
                    display: 'flex',
                    fontSize: '12px',
                    textTransform: 'unset',
                    padding: '6px 10px',
                    flex: 1,
                    color: 'text.primary',
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: 'text.burntSienna',
                      borderColor: 'text.burntSienna',
                      background: 'transparent',
                      borderRight: '1px solid text.burntSienna',
                    },
                  }}
                >
                  English
                </ToggleButton>
                <ToggleButton
                  value="vietnam"
                  sx={{
                    display: 'flex',
                    fontSize: '12px',
                    textTransform: 'unset',
                    padding: '6px 10px',
                    flex: 1,
                    color: 'text.primary',
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: 'text.burntSienna',
                      borderColor: 'text.burntSienna',
                      background: 'transparent',
                      borderLeft: '1px solid text.burntSienna',
                    },
                  }}
                >
                  Vietnam
                </ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
            <ListItem>
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
                sx={{
                  padding: 0,
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
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
                sx={{ padding: 0, marginLeft: '4px' }}
              >
                {isDarkMode ? (
                  <Box component="img" src={Assets.darkIconDarkTheme} />
                ) : (
                  <Box component="img" src={Assets.darkIconLightTheme} />
                )}
              </IconButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      {_renderSubHeader()}
    </AppBar>
  );
};

export default AppBarComponent;
