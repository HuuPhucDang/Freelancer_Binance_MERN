import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Grow,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Fade } from 'react-reveal';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { ROUTERS } from '@/Constants';
import { Utils } from '@/Libs';

const Home: React.FC = () => {
  // Constructors
  const userData = Utils.getUserData();
  console.log(userData);

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
                  fontSize: {
                    xs: '34px',
                    pc: '80px',
                  },
                  fontWeight: 700,
                  lineHeight: {
                    xs: '41px',
                    pc: '95px',
                  },
                  flex: 1,
                  textAlign: 'left',
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
                pc: '605px',
              }}
              marginX={{
                xs: 'auto',
                md: 'unset',
              }}
              marginY={{
                xs: '30px',
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
                }}
              >
                <Box
                  component="img"
                  src={Assets.giftIcon}
                  sx={{
                    width: {
                      xs: '34px',
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
                    xs: '27px',
                    pc: '57px',
                  },
                  // color: 'text.secondary',
                  textTransform: 'unset',
                  fontWeight: 400,
                }}
                color="burntSienna"
              >
                {userData ? (
                  <Box
                    component="img"
                    src={Assets.moneyTransactionIcon}
                    sx={{ marginRight: '16px' }}
                  />
                ) : (
                  <PersonIcon sx={{ fontSize: '55px', marginRight: '16px' }} />
                )}
                {userData ? (
                  <Link
                    sx={{
                      fontSize: {
                        xs: '12px',
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
                      fontSize: '12px',
                    }}
                    href={ROUTERS.SIGN_UP}
                  >
                    Đăng kí bằng Email hoặc Điện thoại
                  </Link>
                )}
              </Button>
              <Typography
                sx={{
                  fontSize: {
                    xs: '12px',
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
                    sx={{ fontSize: '20px', color: 'text.secondary' }}
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
            </Stack>
          </Stack>
        </Grid>
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
      </Grid>
    );
  };

  const _renderNumber = () => {
    return (
      <Grid container sx={{ marginTop: '40px' }} spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Stack direction="column" padding="20px 10px">
            <Typography
              sx={{
                fontSize: {
                  xs: '32px',
                  pc: '64px',
                },
                lineHeight: {
                  xs: '39px',
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
                  pc: '20px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
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
        <Grid item xs={12} sm={4} md={4}>
          <Stack direction="column" padding="20px 10px">
            <Typography
              sx={{
                fontSize: {
                  xs: '32px',
                  pc: '64px',
                },
                lineHeight: {
                  xs: '39px',
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
                  pc: '20px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
                  pc: '24px',
                },
                textAlign: 'left',
              }}
            >
              Những người dùng đăng kí{' '}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Stack direction="column" padding="20px 10px">
            <Typography
              sx={{
                fontSize: {
                  xs: '32px',
                  pc: '64px',
                },
                lineHeight: {
                  xs: '39px',
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
                  pc: '20px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
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
          // spacing={{
          //   xs: 6,
          //   pc: 12,
          // }}
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
                padding: '30px 14px',
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
                Khám phá thế giới NFT{' '}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '11px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
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
                Mở các hộp bí hiểm, khám phá IGO (đợt phát hành sản phẩm trong
                game lần đầu), Fan TokenToken, v.v. với ....
              </Typography>
              <Link
                sx={{
                  fontSize: {
                    xs: '11px',
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
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
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
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
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
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
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
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
                    pc: '20px',
                  },
                  lineHeight: {
                    xs: '14px',
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
                  pc: '70px',
                },
                lineHeight: {
                  xs: '41px',
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
                  pc: '20px',
                },
                fontWeight: 400,
                lineHeight: {
                  xs: '16px',
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
          <Grid item md={1.5} sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
        </Grid>
        <Grid
          container
          marginTop={{
            xs: '50px',
            pc: '80px',
          }}
          columnSpacing={8}
        >
          <Grid item md={6}>
            <Stack direction="row" padding="0 0 0 50px" alignItems="center">
              <Box
                component="img"
                src={Assets.safeIcon}
                sx={{
                  width: {
                    xs: '50px',
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
                      pc: '28px',
                    },
                    fontWeight: 700,
                    lineHeight: {
                      xs: '17px',
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
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
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
              padding="0 0 0 50px"
              alignItems="center"
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
                      pc: '28px',
                    },
                    fontWeight: 700,
                    lineHeight: {
                      xs: '17px',
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
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
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
              padding="0 0 0 50px"
              alignItems="center"
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
                      pc: '28px',
                    },
                    fontWeight: 700,
                    lineHeight: {
                      xs: '17px',
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
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: {
                      xs: '17px',
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
          <Grid item md={6}>
            <Box
              component="img"
              src={Assets.preventImage}
              sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Grid>
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
              pc: '70px',
            },
            lineHeight: {
              xs: '41px',
              pc: '80px',
            },
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Lí do nên giao dịch cùng chúng tôi{' '}
        </Typography>
        <Grid container rowSpacing={7} columnSpacing={3} marginTop="20px">
          <Grid item md={5.4}>
            <Stack direction="row" alignItems="flex-start">
              <Box
                component="img"
                src={Assets.personIcon}
                sx={{
                  width: {
                    xs: '80px',
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '16px',
                }}
              />
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
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
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
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
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '16px',
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
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
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
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
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '16px',
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
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
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
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
                    pc: '148px',
                  },
                  height: 'auto',
                  objectFit: 'contain',
                  marginRight: '16px',
                }}
              />{' '}
              <Stack direction="column">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '17px',
                      pc: '28px',
                    },
                    lineHeight: {
                      xs: '21px',
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
                      pc: '20px',
                    },
                    lineHeight: {
                      xs: '15px',
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
        <Grid container columnSpacing={7} marginTop="60px">
          <Grid item md={4}>
            <Stack direction="column">
              <Box
                component="img"
                src={Assets.greenIcon}
                sx={{
                  width: '162px',
                  height: '162px',
                  objectFit: 'contain',
                  marginLeft: '-38px',
                }}
              />
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
          </Grid>
          <Grid item md={4}>
            <Stack direction="column">
              <Box
                component="img"
                src={Assets.redIcon}
                sx={{
                  width: '162px',
                  height: '162px',
                  objectFit: 'contain',
                  marginLeft: '-38px',
                }}
              />{' '}
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
                Cơ chế khớp lệnh nhanh và ổn định của chúng tôi có thể xử lý đến
                100.000 lệnh mỗi giây, độ trễ tối thiểu chỉ là 5 mili giây.
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
          </Grid>
          <Grid item md={4}>
            <Stack direction="column">
              <Box
                component="img"
                src={Assets.blueIcon}
                sx={{
                  width: '162px',
                  height: '162px',
                  objectFit: 'contain',
                  marginLeft: '-38px',
                }}
              />{' '}
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
                Nhanh chóng, dễ dàng, thu nhập cao và phí thấp, Binance mang đến
                cho bạn tất cả những gì bạn cần với tiền mã hoá, thật tuyệt
                vời！
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
          columnSpacing={4}
          rowSpacing={2}
        >
          <Grid
            item
            xs={12}
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
                Mở Tài Khoản (đăng kí)
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={12}
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
                Giao dịch ngay (đăng nhập){' '}
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
        // maxWidth="md"
        padding="24px"
        sx={{
          maxWidth: '1920px',
          my: { textAlign: '-webkit-center' },
          mx: 'auto',
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
        <Fade>{_renderAbout()}</Fade>
        <Fade>{_renderReason()}</Fade>
        <Fade>{_renderFeedback()}</Fade>
        <Fade>{_renderInvite()}</Fade>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Binance" />;
};

export default Home;
