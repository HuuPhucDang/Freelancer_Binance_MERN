import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Grow,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Fade } from 'react-reveal';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { ROUTERS } from '@/Constants';
import { Utils } from '@/Libs';

const Home: React.FC = () => {
  // Constructors
  const userData = Utils.getUserData();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  // Renders
  const _renderHero = () => {
    return (
      <Grid container>
        <Grid item md={5.5}>
          <Stack
            direction="column"
            height="100%"
            marginTop={{
              pc: '65px',
            }}
          >
            <Stack
              flex={{
                xs: 1,
                lg: 'unset',
              }}
            >
              <Typography
                sx={{
                  padding: {
                    md: '50px',
                    pc: 'unset',
                  },
                  fontSize: {
                    xs: '34px',
                    ip13: '40px',
                    md: '64px',
                    pc: '80px',
                  },
                  fontWeight: 700,
                  lineHeight: {
                    xs: '41px',
                    ip13: '48px',
                    md: '74px',
                    pc: '95px',
                  },
                  flex: 1,
                  textAlign: 'left',
                  maxWidth: {
                    ip13: '350px',
                    md: '100%',
                    pc: '100%',
                  },
                }}
              >
                Giao dịch cả khi đang di chuyển. Mọi lúc, mọi nơi.
              </Typography>
            </Stack>
            <Stack
              direction="column"
              width="100%"
              maxWidth={{
                xs: '300px',
                ip13: '100%',
                pc: '605px',
              }}
              marginX={{
                xs: 'auto',
                ip13: 'unset',
                md: 'unset',
              }}
              marginY={{
                android: '5px',
                xs: '30px',
                ip13: '0',
                md: 'unset',
                lg: '40px',
              }}
            >
              <Link
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  marginLeft: {
                    android: '-80px',
                    ip13: '-50px',
                    md: 'unset',
                  },
                }}
              >
                <Box
                  component="img"
                  src={Assets.giftIcon}
                  sx={{
                    width: {
                      xs: '34px',
                      ip13: '56px',
                      pc: '96px',
                    },
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: {
                      xs: '12px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: '15px',
                    color: 'text.primary',
                  }}
                >
                  Giao dịch Bitcoin mà không mất phí &gt;
                </Typography>
              </Link>
              <Button
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'background.primary',
                  height: {
                    android: '52px',
                    xs: '27px',
                    ip13: '52px',
                    pc: '57px',
                  },
                  width: {
                    android: 1,
                    ip13: '100%',
                    md: 1,
                  },
                  justifySelf: 'center',
                  alignSelf: 'center',
                  textTransform: 'unset',
                  fontWeight: 400,
                }}
                color="burntSienna"
              >
                {userData?.id ? (
                  <Box
                    component="img"
                    src={Assets.moneyTransactionIcon}
                    sx={{ marginRight: '16px' }}
                  />
                ) : (
                  <PersonIcon
                    sx={{
                      fontSize: {
                        xs: '35px',
                        ip13: '40px',
                        pc: '55px',
                      },
                      marginRight: '16px',
                      color: '#000000',
                    }}
                  />
                )}
                {userData?.id ? (
                  <Link
                    sx={{
                      fontSize: {
                        xs: '12px',
                        ip13: '18px',
                        pc: '20px',
                      },
                    }}
                    href={ROUTERS.TRANSACTION}
                  >
                    Giao dịch ngay
                  </Link>
                ) : (
                  <Link
                    sx={{
                      fontSize: {
                        xs: '12px',
                        ip13: '18px',
                        pc: '20px',
                      },
                    }}
                    href={ROUTERS.SIGN_UP}
                  >
                    Đăng kí bằng Email hoặc Điện thoại
                  </Link>
                )}
              </Button>
              {isMd ? null : (
                <>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        md: '20px',
                        pc: '20px',
                      },
                      lineHeight: '15px',
                      margin: {
                        xs: '10px 0',
                        md: '20px 0',
                      },
                    }}
                  >
                    Hoặc tiếp tục bằng{' '}
                  </Typography>
                  <Stack direction="row" spacing="24px" justifyContent="center">
                    <Button
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: {
                          xs: '130px',
                          md: '200px',
                          pc: '252px',
                        },
                        backgroundColor: 'background.lightSilver',
                        textTransform: 'unset',
                        borderRadius: '0px',
                      }}
                    >
                      <Box
                        component="img"
                        src={Assets.googleStoreIcon}
                        sx={{
                          width: {
                            xs: '24px',
                            pc: '42px',
                          },
                          height: {
                            xs: '24px',
                            pc: '42px',
                          },
                          marginRight: '20px',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: {
                            xs: '12px',
                            md: '20px',
                            pc: '20px',
                          },
                          color: 'text.secondary',
                        }}
                      >
                        Download <br />
                        app android
                      </Typography>
                    </Button>
                    <Button
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: {
                          xs: '130px',
                          md: '200px',
                          pc: '252px',
                        },
                        backgroundColor: 'background.lightSilver',
                        textTransform: 'unset',
                        borderRadius: '0px',
                      }}
                    >
                      <Box
                        component="img"
                        src={Assets.appleIcon}
                        sx={{
                          width: {
                            xs: '24px',
                            pc: '42px',
                          },
                          height: {
                            xs: '24px',
                            pc: '42px',
                          },
                          marginRight: '20px',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: {
                            xs: '12px',
                            md: '20px',
                            pc: '20px',
                          },
                          color: 'text.secondary',
                        }}
                      >
                        Download <br />
                        app ios
                      </Typography>
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        </Grid>
        {isMd ? null : (
          <Grid item md={6.5}>
            <Box
              component="img"
              src={Assets.deviceImage}
              sx={{
                width: {
                  xs: '100%',
                  lg: '100%',
                },
                height: {
                  xs: 'auto',
                  // lg: '300px',
                },
                objectFit: 'contain',
              }}
            />
            <Typography
              sx={{
                fontSize: {
                  xs: '16px',
                  pc: '20px',
                },
                lineHeight: '20px',
                fontWeight: 600,
                padding: '0 10px',
              }}
            >
              Luôn cập nhật thông tin với ứng dụng trên app và desktop của chúng
              tôi
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  const _renderNumber = () => {
    return (
      <Grid container sx={{ marginTop: '40px' }} spacing={2}>
        <Grid item xs={12} android={6} ip13={6} sm={4} md={4}>
          <Stack direction="column" padding="20px 10px">
            <Typography
              sx={{
                fontSize: {
                  xs: '32px',
                  android: '23px',
                  ip13: '25px',
                  pc: '64px',
                },
                lineHeight: {
                  xs: '39px',
                  ip13: '34px',
                  pc: '70px',
                },
                fontWeight: 700,
                marginBottom: '10px',
                textAlign: 'left',
              }}
            >
              38 tỷ đô la
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '13px',
                  ip13: '20px',
                  android: '18px',
                  pc: '20px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
                  ip13: '24px',
                  pc: '24px',
                },
                maxWidth: {
                  xs: '210px',
                  pc: '500px',
                },
                textAlign: 'left',
              }}
            >
              Khối lượng giao dịch trong vòng 24 giờ trên sàn giao dịch Binance
            </Typography>
          </Stack>
        </Grid>
        {isMd ? (
          <Grid item xs={12} android={6} ip13={6} sm={4} md={4}>
            <Stack direction="column" padding="20px 10px">
              <Typography
                sx={{
                  fontSize: {
                    xs: '32px',
                    ip13: '25px',
                    android: '23px',
                    pc: '64px',
                  },
                  lineHeight: {
                    xs: '39px',
                    ip13: '34px',
                    pc: '70px',
                  },
                  fontWeight: 700,
                  marginBottom: '10px',
                  textAlign: 'left',
                }}
              >
                350 +
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '13px',
                    ip13: '20px',
                    android: '18px',
                    pc: '20px',
                  },
                  fontWeight: 400,
                  lineHeight: {
                    xs: '16px',
                    ip13: '24px',
                    pc: '24px',
                  },
                  maxWidth: {
                    xs: '210px',
                    pc: '500px',
                  },
                  textAlign: 'left',
                }}
              >
                Tiền tệ điện tử được liệt kê
              </Typography>
            </Stack>
          </Grid>
        ) : null}
        <Grid item xs={12} android={6} ip13={6} sm={4} md={4}>
          <Stack direction="column" padding="20px 10px">
            <Typography
              sx={{
                fontSize: {
                  xs: '32px',
                  ip13: '25px',
                  android: '23px',
                  pc: '64px',
                },
                lineHeight: {
                  xs: '39px',
                  ip13: '34px',
                  pc: '70px',
                },
                fontWeight: 700,
                marginBottom: '10px',
                textAlign: 'left',
              }}
            >
              120 triệu
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '13px',
                  ip13: '20px',
                  pc: '20px',
                  android: '18px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
                  ip13: '24px',
                  pc: '24px',
                },
                textAlign: 'left',
              }}
            >
              Những người dùng đăng kí{' '}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} android={6} ip13={6} sm={4} md={4}>
          <Stack direction="column" padding="20px 10px">
            <Typography
              sx={{
                fontSize: {
                  xs: '32px',
                  ip13: '25px',
                  pc: '64px',
                  android: '23px',
                },
                lineHeight: {
                  xs: '39px',
                  ip13: '34px',
                  pc: '70px',
                },
                fontWeight: 700,
                marginBottom: '10px',
                textAlign: 'left',
              }}
            >
              {' '}
              &lt; 0,10%{' '}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '13px',
                  ip13: '20px',
                  pc: '20px',
                  android: '18px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
                  ip13: '24px',
                  pc: '24px',
                },
                textAlign: 'left',
              }}
            >
              Phí giao dịch thấp nhất
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const _renderChance = () => {
    return (
      <Stack
        direction="column"
        marginTop={{
          xs: '60px',
          ip13: '30px',
          pc: '230px',
        }}
        padding={{
          xs: 0,
          pc: '0 10px',
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: '34px',
              ip13: '36px',
              pc: '70px',
            },
            lineHeight: '41px',
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Khám phá vô vàn cơ hội đầu tư trên Binance{' '}
        </Typography>
        <Grid
          container
          rowSpacing={{
            xs: 3,
          }}
          columnSpacing={{
            xs: 6,
            pc: '92px',
          }}
          marginTop={{
            xs: '20px',
            pc: '80px',
          }}
        >
          <Grid item md={3.7}>
            <Stack
              direction="column"
              sx={{
                backgroundColor: 'background.secondary',
                padding: {
                  ip13: '10px',
                  pc: '30px 14px',
                },
                height: '100%',
              }}
            >
              <Box
                component="img"
                src={Assets.exploreImage}
                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: {
                    xs: '16px',
                    ip13: '25px',
                    pc: '28px',
                  },
                  fontWeight: 700,
                  lineHeight: '20px',
                  textAlign: 'left',
                  marginTop: {
                    xs: '10px',
                    pc: '50px',
                  },
                  padding: { xs: '0px 24px', pc: '0 30px' },
                }}
              >
                Khám phá thế giới NFT{' '}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '11px',
                    ip13: '20px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
                    ip13: '28px',
                    pc: '28px',
                  },
                  fontWeight: 400,
                  color: 'text.primary',
                  textAlign: 'left',
                  marginTop: {
                    xs: '10px',
                    pc: '24px',
                  },
                  padding: { xs: '0px 24px', pc: '0 30px' },
                }}
              >
                Mở các hộp bí hiểm, khám phá IGO (đợt phát hành sản phẩm trong
                game lần đầu), Fan TokenToken, v.v. với ....
              </Typography>
              <Link
                sx={{
                  fontSize: {
                    xs: '11px',
                    ip13: '20px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
                    ip13: '28px',
                    pc: '28px',
                  },
                  fontWeight: 400,
                  color: 'text.burntSienna',
                  textAlign: 'left',
                  marginTop: '20px',
                  padding: { xs: '0px 24px', pc: '0 30px' },
                }}
              >
                Tìm hiểu thêm
              </Link>
            </Stack>
          </Grid>
          <Grid item md={3.7}>
            <Stack
              direction="column"
              sx={{
                backgroundColor: 'background.secondary',
                padding: '15px',
                height: '100%',
              }}
            >
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: {
                    xs: '16px',
                    ip13: '25px',
                    pc: '28px',
                  },
                  fontWeight: 700,
                  lienHeight: '20px',
                  textAlign: 'left',
                  padding: '0 14px',
                }}
              >
                Phát triển doanh nghiệp với Binance Pay{' '}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '11px',
                    ip13: '20px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
                    ip13: '28px',
                    pc: '28px',
                  },
                  fontWeight: 400,
                  color: 'text.primary',
                  textAlign: 'left',
                  marginTop: {
                    xs: '10px',
                    pc: '24px',
                  },
                  padding: '0 14px',
                }}
              >
                Thu hút thêm nhiều khách hàng bằng cách thanh toán và nhận khoản
                thanh toán bằng tiền mã hóa với công nghệ thanh toán không biên
                giới{' '}
              </Typography>
              <Link
                sx={{
                  fontSize: {
                    xs: '11px',
                    ip13: '20px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
                    ip13: '28px',
                    pc: '28px',
                  },
                  fontWeight: 400,
                  color: 'text.burntSienna',
                  textAlign: 'left',
                  marginTop: '20px',
                  padding: '0 14px',
                }}
              >
                Tìm hiểu thêm
              </Link>
              <Box
                component="img"
                src={Assets.growImage}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  marginTop: {
                    xs: '10px',
                    pc: '50px',
                  },
                }}
              />
            </Stack>
          </Grid>
          <Grid item md={3.7}>
            <Stack
              direction="column"
              sx={{
                backgroundColor: 'background.secondary',
                padding: '15px',
                height: '100%',
              }}
            >
              <Box
                component="img"
                src={Assets.earnImage}
                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: {
                    xs: '16px',
                    ip13: '25px',
                    pc: '28px',
                  },
                  fontWeight: 700,
                  lienHeight: '20px',
                  textAlign: 'left',
                  marginTop: {
                    xs: '10px',
                    pc: '50px',
                  },
                  padding: '0 30px',
                }}
              >
                Binance Earn{' '}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '11px',
                    ip13: '20px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
                    ip13: '28px',
                    pc: '28px',
                  },
                  fontWeight: 400,
                  color: 'text.primary',
                  textAlign: 'left',
                  marginTop: {
                    xs: '10px',
                    pc: '24px',
                  },
                  padding: '0 30px',
                }}
              >
                Gửi tiền mã hóa và bắt đầu tăng thu nhập ất
              </Typography>
              <Link
                sx={{
                  fontSize: {
                    xs: '11px',
                    ip13: '20px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
                    ip13: '28px',
                    pc: '28px',
                  },
                  fontWeight: 400,
                  color: 'text.burntSienna',
                  textAlign: 'left',
                  marginTop: '20px',
                  padding: '0 30px',
                }}
              >
                Tìm hiểu thêm
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };

  const _renderAbout = () => {
    return (
      <Stack
        direction="column"
        marginTop="60px"
        sx={{
          padding: {
            xs: '0px',
            pc: '0 35px',
          },
        }}
      >
        <Grid container>
          <Grid item md={10.5}>
            <Typography
              sx={{
                fontSize: {
                  xs: '34px',
                  ip13: '36px',
                  pc: '70px',
                },
                lineHeight: {
                  xs: '41px',
                  ip13: '48px',
                  pc: '80px',
                },
                fontWeight: 700,
                textAlign: 'left',
              }}
            >
              Sàn giao dịch mã hóa đáng tin cậy của bạn{' '}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '13px',
                  ip13: '15px',
                  pc: '20px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
                  ip13: '20px',
                  pc: '24px',
                },
                textAlign: 'left',
                marginTop: {
                  xs: '6px',
                  pc: '30px',
                },
              }}
            >
              Tại Binance, chúng tôi cam kết bảo vệ người dùng bằng các quy định
              nghiêm ngặt và các biện pháp kĩ thuật đầu ngành{' '}
            </Typography>
          </Grid>
          {isMd ? null : (
            <Grid
              item
              md={1.5}
              sx={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <Link
                sx={{
                  fontSize: {
                    xs: '13px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '16px',
                    pc: '24px',
                  },
                  fontWeight: 400,
                  textAlign: 'left',
                  marginTop: '20px',
                  color: 'text.primary',
                }}
              >
                Tìm hiểu thêm
                <span style={{ display: 'inline-block', marginLeft: '10px' }}>
                  &gt;
                </span>
              </Link>
            </Grid>
          )}
        </Grid>
        {isMd ? (
          <Grid item md={12}>
            <Box
              component="img"
              src={Assets.preventImage}
              sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Grid>
        ) : null}
        <Grid
          container
          marginTop={{
            xs: '50px',
            pc: '80px',
          }}
          columnSpacing={8}
        >
          <Grid item md={6}>
            <Stack
              direction="row"
              padding={{ xs: 0, pc: '0 0 0 50px' }}
              alignItems={{
                xs: 'flex-start',
                pc: 'center',
              }}
            >
              <Box
                component="img"
                src={Assets.safeIcon}
                sx={{
                  width: {
                    xs: '50px',
                    ip13: '37px',
                    pc: '88px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '15px',
                }}
              />
              <Stack direction="column" flex={1}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      ip13: '18px',
                      pc: '28px',
                    },
                    fontWeight: 600,
                    lineHeight: {
                      xs: '17px',
                      ip13: '24px',
                      pc: '35px',
                    },
                    textAlign: 'left',
                  }}
                >
                  Quỹ tài sản an toàn cho người dùng{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
                      ip13: '23px',
                      pc: '28px',
                    },
                    textAlign: 'left',
                    marginTop: {
                      xs: '5px',
                      pc: '14px',
                    },
                  }}
                >
                  Binance trích 10% phí giao dịch trong một quỹ tài sản để bảo
                  vệ một phần tiền của người dùng{' '}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              padding={{ xs: 0, pc: '0 0 0 50px' }}
              alignItems={{
                xs: 'flex-start',
                pc: 'center',
              }}
              marginTop={{
                xs: '30px',
                pc: '100px',
              }}
            >
              <Box
                component="img"
                src={Assets.eyeIcon}
                sx={{
                  width: {
                    xs: '50px',
                    ip13: '37px',
                    pc: '88px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '15px',
                }}
              />{' '}
              <Stack direction="column" flex={1}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      ip13: '18px',
                      pc: '28px',
                    },
                    fontWeight: 600,
                    lineHeight: {
                      xs: '17px',
                      ip13: '24px',
                      pc: '35px',
                    },
                    textAlign: 'left',
                  }}
                >
                  Kiểm soát quyền truy cập theo ý muốn riêng{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
                      ip13: '23px',
                      pc: '28px',
                    },
                    textAlign: 'left',
                    marginTop: {
                      xs: '5px',
                      pc: '14px',
                    },
                  }}
                >
                  Tính năng kiểm soát quyền truy cập cá nhân hóa cho phép bạn
                  hạn chế các thiết bị và địa chỉ có thể truy cập vào tài khoản
                  của bạn, giúp bạn yên tâm hơn.{' '}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              padding={{ xs: 0, pc: '0 0 0 50px' }}
              alignItems={{
                xs: 'flex-start',
                pc: 'center',
              }}
              marginTop={{
                xs: '30px',
                pc: '100px',
              }}
            >
              <Box
                component="img"
                src={Assets.lockIcon}
                sx={{
                  width: {
                    xs: '50px',
                    ip13: '37px',
                    pc: '88px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '15px',
                }}
              />{' '}
              <Stack direction="column" flex={1}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      ip13: '18px',
                      pc: '28px',
                    },
                    fontWeight: 600,
                    lineHeight: {
                      xs: '17px',
                      ip13: '24px',
                      pc: '35px',
                    },
                    textAlign: 'left',
                  }}
                >
                  Công nghệ mã hóa dữ liệu nâng cao{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
                      ip13: '23px',
                      pc: '28px',
                    },
                    textAlign: 'left',
                    marginTop: {
                      xs: '5px',
                      pc: '14px',
                    },
                  }}
                >
                  Dữ liệu giao dịch của bạn được bảo mật thông qua công nghệ mã
                  hóa đầu cuối, đảm bảo chỉ bạn mới có quyền truy cập thông tin
                  cá nhân của mình.{' '}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {isMd ? null : (
            <Grid item md={6}>
              <Box
                component="img"
                src={Assets.preventImage}
                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </Grid>
          )}
        </Grid>
      </Stack>
    );
  };

  const _renderReason = () => {
    return (
      <Stack
        direction="column"
        marginTop="80px"
        sx={{
          padding: {
            xs: '0px',
            pc: '0 35px',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: '34px',
              ip13: '36px',
              pc: '70px',
            },
            lineHeight: {
              xs: '41px',
              ip13: '48px',
              pc: '80px',
            },
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Lí do nên giao dịch cùng chúng tôi{' '}
        </Typography>
        <Grid
          container
          rowSpacing={{ xs: 3, pc: 7 }}
          columnSpacing={3}
          marginTop={{ xs: '0px', pc: '20px' }}
        >
          <Grid item md={5.4}>
            <Stack direction="row" alignItems="flex-start">
              <Box
                component="img"
                src={Assets.personIcon}
                sx={{
                  width: {
                    xs: '80px',
                    ip13: '58px',
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: {
                    xs: '8px',
                    pc: '16px',
                  },
                }}
              />
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
                      ip13: '24px',
                      pc: '34px',
                    },
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  Lấy người dùng làm trung tâm{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '12px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: '8px',
                  }}
                >
                  Sản phẩm sáng tạo, nâng cao trải nghiệm người dùng và đồng
                  thời cung cấp hiệu suất ổn định và liền mạch mà người dùng có
                  thể tin tưởng. Bộ phận Hỗ trợ Khách hàng 24/7 sẽ giải đáp tất
                  cả thắc mắc của bạn.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={5.4}>
            <Stack direction="row" alignItems="flex-start">
              <Box
                component="img"
                src={Assets.systemIcon}
                sx={{
                  width: {
                    xs: '80px',
                    ip13: '58px',
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: {
                    xs: '8px',
                    pc: '16px',
                  },
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
                      ip13: '24px',
                      pc: '34px',
                    },
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  Cơ chế khớp lệnh hàng đầu thị trường
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '12px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: '8px',
                  }}
                >
                  Cơ chế khớp lệnh nhanh và ổn định của chúng tôi có thể xử lý
                  đến 100.000 lệnh mỗi giây, độ trễ tối thiểu chỉ là 5 mili
                  giây.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={5.4}>
            <Stack direction="row" alignItems="flex-start">
              <Box
                component="img"
                src={Assets.contactIcon}
                sx={{
                  width: {
                    xs: '80px',
                    ip13: '58px',
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: {
                    xs: '8px',
                    pc: '16px',
                  },
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
                      ip13: '24px',
                      pc: '34px',
                    },
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  Lựa chọn các Sản phẩm Hợp đồng Tương lai Tiền mã hóa đa dạng{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '12px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: '8px',
                  }}
                >
                  Lựa chọn hơn 90 hợp đồng, bao gồm các hợp đồng ký quỹ bằng
                  USDT và bằng Coin.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={5.4}>
            <Stack direction="row" alignItems="flex-start">
              <Box
                component="img"
                src={Assets.batteryIcon}
                sx={{
                  width: {
                    xs: '80px',
                    ip13: '58px',
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: {
                    xs: '8px',
                    pc: '16px',
                  },
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
                      ip13: '24px',
                      pc: '34px',
                    },
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  Giao dịch ngay cả khi đang di chuyển{' '}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '12px',
                      ip13: '15px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
                      ip13: '20px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: '8px',
                  }}
                >
                  Truy cập một cách nhanh chóng và an toàn ngay từ smartphone
                  của bạn. Đã hỗ trợ Android và iOS!
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };

  const _renderFeedback = () => {
    return (
      <Stack
        direction="column"
        marginTop={{
          xs: '80px',
          pc: '100px',
        }}
        sx={{
          padding: {
            xs: '0px',
            pc: '0 35px',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: '34px',
              ip13: '32px',
              pc: '80px',
            },
            lineHeight: {
              xs: '41px',
              pc: '90px',
            },
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Phản hồi từ người dùng{' '}
        </Typography>
        <Grid
          container
          columnSpacing={7}
          rowSpacing={2}
          marginTop={{ xs: '0px', pc: '60px' }}
        >
          <Grid item md={4}>
            <Stack direction={{ xs: 'row', pc: 'column' }}>
              <Box
                component="img"
                src={Assets.greenIcon}
                sx={{
                  width: {
                    xs: '68px',
                    pc: '162px',
                  },
                  height: {
                    xs: '68px',
                    pc: '162px',
                  },
                  objectFit: 'contain',
                  marginLeft: {
                    xs: '-10px',
                    pc: '-38px',
                  },
                }}
              />
              <Stack direction="column">
                <Typography
                  sx={{
                    textAlign: 'left',
                    fontSize: {
                      xs: '14px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
                      pc: '28px',
                    },
                  }}
                >
                  Rất nhiều đồng coin. Chưa kể Binance vẫn chưa một lần làm tôi
                  thất vọng trong 4 năm giao dịch tiền mã hóa tính đến nay.
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '17px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: {
                      xs: '20px',
                      pc: '90px',
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ color: 'text.burntSienna', fontSize: 'inherit' }}
                  >
                    #twitter
                  </Typography>{' '}
                  | by...
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={4}>
            <Stack direction={{ xs: 'row', pc: 'column' }}>
              <Box
                component="img"
                src={Assets.redIcon}
                sx={{
                  width: {
                    xs: '68px',
                    pc: '162px',
                  },
                  height: {
                    xs: '68px',
                    pc: '162px',
                  },
                  objectFit: 'contain',
                  marginLeft: {
                    xs: '-10px',
                    pc: '-38px',
                  },
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    textAlign: 'left',
                    fontSize: {
                      xs: '14px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
                      pc: '28px',
                    },
                  }}
                >
                  Cơ chế khớp lệnh nhanh và ổn định của chúng tôi có thể xử lý
                  đến 100.000 lệnh mỗi giây, độ trễ tối thiểu chỉ là 5 mili
                  giây.
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '17px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: {
                      xs: '20px',
                      pc: '90px',
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ color: 'text.burntSienna', fontSize: 'inherit' }}
                  >
                    #twitter
                  </Typography>{' '}
                  | by...
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={4}>
            <Stack direction={{ xs: 'row', pc: 'column' }}>
              <Box
                component="img"
                src={Assets.blueIcon}
                sx={{
                  width: {
                    xs: '68px',
                    pc: '162px',
                  },
                  height: {
                    xs: '68px',
                    pc: '162px',
                  },
                  objectFit: 'contain',
                  marginLeft: {
                    xs: '-3px',
                    pc: '-38px',
                  },
                }}
              />{' '}
              <Stack direction="column">
                {' '}
                <Typography
                  sx={{
                    textAlign: 'left',
                    fontSize: {
                      xs: '14px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
                      pc: '28px',
                    },
                  }}
                >
                  Nhanh chóng, dễ dàng, thu nhập cao và phí thấp, Binance mang
                  đến cho bạn tất cả những gì bạn cần với tiền mã hoá, thật
                  tuyệt vời！
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '14px',
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '17px',
                      pc: '28px',
                    },
                    fontWeight: 400,
                    textAlign: 'left',
                    marginTop: {
                      xs: '20px',
                      pc: '90px',
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{ color: 'text.burntSienna', fontSize: 'inherit' }}
                  >
                    #twitter
                  </Typography>{' '}
                  | by...
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };

  const _renderInvite = () => {
    return (
      <Stack
        direction="column"
        marginTop={{
          xs: '80px',
          pc: '180px',
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: '24px',
              ip13: '20px',
              pc: '64px',
            },
            lineHeight: '29px',
            fontWeight: 700,
          }}
        >
          Bắt đầu giao dịch Hợp đồng tương lai tiền mã hóa ngay{' '}
        </Typography>
        <Grid
          container
          marginTop={{
            xs: '10px',
            pc: '40px',
          }}
          columnSpacing={{ xs: 2, pc: 6 }}
          rowSpacing={2}
        >
          <Grid
            item
            xs={12}
            ip13={6}
            android={6}
            md={6}
            display="flex"
            justifyContent={{ xs: 'center', md: 'flex-end' }}
          >
            {userData?.id ? (
              <Button
                sx={{
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: {
                    xs: '53px',
                    pc: '86px',
                  },
                  width: {
                    xs: '220px',
                    pc: '393px',
                  },
                  fontWeight: 700,
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                }}
                href={ROUTERS.RECHARGE}
              >
                Nạp
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: {
                    xs: '53px',
                    pc: '86px',
                  },
                  width: {
                    xs: '220px',
                    pc: '393px',
                  },
                  fontWeight: 700,
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                }}
                href={ROUTERS.SIGN_UP}
              >
                Mở Tài Khoản {isMd ? <br /> : null} (đăng kí)
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            android={6}
            ip13={6}
            md={6}
            display="flex"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            {userData?.id ? (
              <Button
                sx={{
                  backgroundColor: 'background.lightSilver',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: {
                    xs: '53px',
                    pc: '86px',
                  },
                  width: {
                    xs: '220px',
                    pc: '393px',
                  },
                  fontWeight: 700,
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                }}
                href={ROUTERS.WITHDRAW_MONEY}
              >
                Rút
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: 'background.lightSilver',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: {
                    xs: '53px',
                    pc: '86px',
                  },
                  width: {
                    xs: '220px',
                    pc: '393px',
                  },
                  fontWeight: 700,
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                }}
                href={ROUTERS.SIGN_IN}
              >
                Giao dịch ngay{isMd ? <br /> : null} (đăng nhập){' '}
              </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        padding={{ xs: '11px', pc: '24px' }}
        sx={{
          maxWidth: '1920px',
          my: { textAlign: '-webkit-center' },
          mx: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <Grow in timeout={500}>
          {_renderHero()}
        </Grow>
        <Grow in timeout={800}>
          {_renderNumber()}
        </Grow>
        <Grow in timeout={800}>
          {_renderChance()}
        </Grow>
        {isMd ? <Fade>{_renderReason()}</Fade> : null}
        <Fade>{_renderAbout()}</Fade>
        {!isMd ? <Fade>{_renderReason()}</Fade> : null}
        <Fade>{_renderFeedback()}</Fade>
        <Fade>{_renderInvite()}</Fade>
      </Box>
    );
  };
  return (
    <UserLayout content={renderMain()} screenTitle="Binance" isShowAppBar />
  );
};

export default Home;
