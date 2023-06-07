import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Box,
  useTheme,
  Link,
  useMediaQuery,
} from '@mui/material';
import { UserLayout } from '@/Components/DefaultLayout';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { StocksChart } from '@/Components/LayoutParts';
import TuneIcon from '@mui/icons-material/Tune';
import VolatilityTable from './VolatilityTable';
import CoinValueTable from './CoinValueTable';
import MyInvoiceTable from './MyInvoiceTable';
import { ROUTERS } from '../../../Constants';

const volatilityHeaderHeight = 33;
const centerVolatilityRow = 31;
const volatilityItemHeight = 19;
const partElementHeight = 200;

const Transaction: React.FC = () => {
  // Constructors
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const volatilityRef = React.useRef<HTMLDivElement | null>(null);
  const [volatilityItemsPerCategory, setVolatilityItemsPerCategory] =
    React.useState<number>(0);

  React.useEffect(() => {
    const handleWindowSize = () => {
      if (volatilityRef && volatilityRef.current) {
        const clientHeight = isMd
          ? 440
          : window.innerHeight - partElementHeight;
        const resolveHeight =
          clientHeight - volatilityHeaderHeight - centerVolatilityRow;
        const eachCategoryHeight = resolveHeight / 2;
        const isLargeThanHalf = eachCategoryHeight % volatilityItemHeight > 0.5;
        const itemPerCategory = isLargeThanHalf
          ? Math.ceil(eachCategoryHeight / volatilityItemHeight)
          : Math.floor(eachCategoryHeight / volatilityItemHeight);
        setVolatilityItemsPerCategory(itemPerCategory);
      }
    };
    handleWindowSize();
    window.addEventListener('load', handleWindowSize);
    window.addEventListener('resize', handleWindowSize);

    return () => {
      window.removeEventListener('load', handleWindowSize);
      window.removeEventListener('resize', handleWindowSize);
    };
  }, []);

  const _renderLeftSection = () => {
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          borderLeft="1px solid #BBAEAE"
          borderBottom="1px solid #BBAEAE"
        >
          <Grid container>
            <Grid item xs={2.5}>
              <Stack
                direction="row"
                sx={{ pr: 1, height: '66px', padding: '10px 4px' }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: '100%',
                    borderRight: '1px solid #BBAEAE',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: 600,
                      marginRight: '4px',
                      lineHeight: '18px',
                    }}
                  >
                    BTC/USDT
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={9.5}>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                height="100%"
              >
                <Stack direction="column">
                  <Typography sx={{ fontSize: '12px' }}>1.11435</Typography>
                  <Typography sx={{ fontSize: '12px' }}>$1.1111</Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: 10 }}>
                    Biến động giá 24h{' '}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: '#C83535' }}>
                    -0.02260 -1.99%
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: 10 }}>
                    Giá cao nhất 24h
                  </Typography>
                  <Typography sx={{ fontSize: 10 }}>1.1777717777</Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: 10 }}>
                    Giá thấp nhất 24h{' '}
                  </Typography>
                  <Typography sx={{ fontSize: 10 }}>1.10659 </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: 10 }}>KL 24h(EDU)</Typography>
                  <Typography sx={{ fontSize: 10 }}>32.754.791.0000</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          padding="0 !important"
          sx={{ borderLeft: '0.5px solid #BBAEAE' }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={2.5}
              order={{ md: 1, xs: 2 }}
              borderRight="1px solid #ccc"
              padding="0"
              ref={volatilityRef}
            >
              <VolatilityTable itemsPerCategory={volatilityItemsPerCategory} />
            </Grid>
            <Grid item xs={12} md={9.5} order={{ md: 2, xs: 1 }}>
              <Stack direction="column">
                <Stack
                  sx={{
                    width: 1,
                    maxWidth: '100%',
                    height: 'calc(100vh - 408px) !important',
                    background: '#000',
                  }}
                >
                  <StocksChart />
                </Stack>
                <Stack
                  flex={1}
                  padding="5px"
                  sx={{
                    width: 1,
                    '& .MuiInputBase-root:before': {
                      borderBottom: 0,
                    },
                  }}
                >
                  <Grid container columnSpacing={1}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '13px', lineHeight: '15px' }}>
                        Số dư:
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền khách bỏ ra để mua/ bán"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Giá ngay thời điểm hiện tại"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế nhận về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế trả về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Grid container spacing={0.5} marginTop="5px">
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                            fullWidth
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                            fullWidth
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                            fullWidth
                          >
                            Moonbot
                          </Button>
                        </Grid>
                      </Grid>
                      <Button
                        color="success"
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                          marginTop: '10px',
                          fontSize: 12,
                          fontWeight: 900,
                          background: '#2EBD85',
                        }}
                      >
                        Mua
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '13px', lineHeight: '15px' }}>
                        Thời gian:
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền khách bỏ ra để mua/ bán"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Giá ngay thời điểm hiện tại"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế nhận về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế trả về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: '8px' }}>
                                  USDT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                      <Grid container spacing={0.5} marginTop="5px">
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: 9,
                              lineHeight: '11px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '100%',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                      </Grid>
                      <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                          marginTop: '10px',
                          fontSize: 12,
                          fontWeight: 900,
                          background: '#F03030',
                        }}
                      >
                        Bán
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const _renderRightSection = () => {
    return (
      <Stack direction="column" maxHeight={{
        xs: "100%",
        md: "calc(100vh - 114px)"
      }}>
        <Stack
          direction="column"
          flex={1}
          borderBottom="1px solid #ccc"
          sx={{ maxHeight: '370px' }}
        >
          <CoinValueTable />
        </Stack>
        <Stack
          direction="column"
          flex={1}
          minHeight="300px"
          maxHeight={{
            xs: 'calc(100vh - 484px)',
            md: 'calc(100vh - 480px)',
            lg: 'calc(100vh - 474px)',
          }}
        >
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: '13px',
              my: 1,
            }}
          >
            Giao dịch của tôi
          </Typography>
          <MyInvoiceTable />
        </Stack>
      </Stack>
    );
  };

  const _renderBottomSection = () => {
    return (
      <Grid container>
        <Grid item xs={6} sm={6} md={2} order={{ xs: 2, md: 1 }}>
          <Stack padding="10px 10px">
            <Stack
              direction="row"
              alignItems="center"
              borderRight="1px solid #ccc"
            >
              <TapAndPlayIcon
                sx={{
                  marginRight: '10px',
                  color: '#408827',
                  fontSize: '16px',
                }}
              />
              <Typography sx={{ fontSize: '12px', color: '#408827' }}>
                Kết nối ổn định
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          sm={12}
          md={7}
          order={{ xs: 1, md: 2 }}
          display={{ xs: 'none', sm: 'block' }}
        >
          <Grid container padding="10px 20px">
            <Grid
              item
              xs={1}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              <TuneIcon />
            </Grid>
            <Grid
              item
              xs={3.66}
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              EDUUSDT{' '}
              <span
                style={{
                  color: '#F03030',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              >
                -1.81
              </span>{' '}
              1.111094
            </Grid>
            <Grid
              item
              xs={3.66}
              display="flex"
              alignItems="center"
              flexDirection="row"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              EDUUSDT{' '}
              <span
                style={{
                  color: '#F03030',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              >
                -1.81
              </span>{' '}
              1.111094
            </Grid>
            <Grid
              item
              xs={3.66}
              display="flex"
              alignItems="center"
              flexDirection="row"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              EDUUSDT{' '}
              <span
                style={{
                  color: '#F03030',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              >
                -1.81
              </span>{' '}
              1.111094
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3} order={{ xs: 3, md: 3 }}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-evenly"
            padding="10px 0"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              borderLeft={{
                xs: 'none',
                md: '1px solid #BBAEAE',
              }}
              paddingLeft="10px"
            >
              <NotificationsIcon
                sx={{
                  fontSize: '16px',
                  marginRight: '6px',
                  color: '#7D6F6F',
                }}
              />
              <Typography
                sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
              >
                Thông báo
              </Typography>
            </Stack>
            <Link href={ROUTERS.SUPPORT}>
              <Stack flexDirection="row" alignItems="center">
                <MarkChatUnreadIcon
                  sx={{
                    fontSize: '16px',
                    marginRight: '6px',
                    color: '#7D6F6F',
                  }}
                />
                <Typography
                  sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
                >
                  Hỗ trợ trực tuyến
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          overflowX: 'hidden',
          mx: 'auto',
        }}
      >
        <Grid
          container
          flex={1}
          display="flex"
          borderTop="1px solid #BBAEAE"
          borderBottom="1px solid #BBAEAE"
        >
          <Grid item xs={12} md={10}>
            {_renderLeftSection()}
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            borderLeft="1px solid #BBAEAE"
            borderRight="1px solid #BBAEAE"
          >
            {_renderRightSection()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {_renderBottomSection()}
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Giao dịch" />;
};

export default Transaction;
