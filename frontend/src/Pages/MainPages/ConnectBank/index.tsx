import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  InputLabel,
  InputAdornment,
  Divider,
  TextField,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { BankActions, UserActions } from '@/Reducers/Actions';
import { useTypedDispatch } from '@/Reducers/store';
import { Utils } from '@/Libs';
import Assets from '@/Assets';

const schema = yup
  .object({
    fullname: yup.string().trim().required('Họ và tên là trường bắt buộc'),
    accountNumber: yup
      .string()
      .matches(/\d+/, 'Số tài khoản phải đúng định dạng số')
      .trim()
      .required('Số tài khoản là trường bắt buộc'),
    bankName: yup.string().trim().required('Tên ngân hàng là trường bắt buộc'),
    bankAddress: yup
      .string()
      .trim()
      .required('Chi nhánh ngân hàng là trường bắt buộc'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const { activeBankCard } = BankActions;
const { getSelf } = UserActions;

const ConnectBank: React.FC = () => {
  // Constructors
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    dispatch(getSelf());
  }, []);

  const onSubmit = (data: FormData) => dispatch(activeBankCard(data));

  const _renderForm = () => {
    return (
      <>
        <Box
          component="form"
          sx={{
            padding: {
              xs: '0px',
              md: '6px 50px 45px 27px',
            },
            backgroundColor: {
              xs: 'unset',
              md: 'background.mainContent',
            },
          }}
        >
          <Stack direction="column">
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: { xs: '20px', pc: '20px' },
                fontWeight: 600,
              }}
            >
              Họ và tên
            </InputLabel>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Họ và tên"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: { xs: '55px', pc: '56px' },
                      fontSize: { xs: '20px', pc: '20px' },
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <ContactEmergencyIcon
                          sx={{ fontSize: { xs: '18px', pc: '28px' } }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.fullname?.message)}
                  helperText={errors?.fullname?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column" marginTop={{ xs: '13px', pc: '20px' }}>
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: { xs: '20px', pc: '20px' },
                fontWeight: 600,
              }}
            >
              Số tài khoản
            </InputLabel>
            <Controller
              name="accountNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Số tài khoản *"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: { xs: '55px', pc: '56px' },
                      fontSize: { xs: '20px', pc: '20px' },
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <CreditCardIcon
                          sx={{ fontSize: { xs: '18px', pc: '28px' } }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.accountNumber?.message)}
                  helperText={errors?.accountNumber?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column" marginTop={{ xs: '13px', pc: '20px' }}>
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: { xs: '20px', pc: '20px' },
                fontWeight: 600,
              }}
            >
              Ngân hàng
            </InputLabel>
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Ngân hàng"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: { xs: '55px', pc: '56px' },
                      fontSize: { xs: '20px', pc: '20px' },
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <AccountBalanceIcon
                          sx={{ fontSize: { xs: '18px', pc: '28px' } }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.bankName?.message)}
                  helperText={errors?.bankName?.message}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column" marginTop={{ xs: '13px', pc: '20px' }}>
            <InputLabel
              sx={{
                color: 'text.primary',
                fontSize: { xs: '20px', pc: '20px' },
                fontWeight: 600,
              }}
            >
              Chi nhánh ngân hàng
            </InputLabel>
            <Controller
              name="bankAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  hiddenLabel
                  variant="outlined"
                  size="small"
                  placeholder="Chi nhánh ngân hàng"
                  sx={{
                    ' .MuiInputBase-root': {
                      background: '#ffffff',
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: { xs: '55px', pc: '56px' },
                      fontSize: { xs: '20px', pc: '20px' },
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.62)',
                    },
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: '14px' }}
                      >
                        <CommentBankIcon
                          sx={{ fontSize: { xs: '18px', pc: '28px' } }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors?.bankAddress?.message)}
                  helperText={errors?.bankAddress?.message}
                  {...field}
                />
              )}
            />
          </Stack>
        </Box>
        <Stack direction="row" alignItems="center" padding="16px 16px 8px 16px">
          <GppGoodIcon
            sx={{
              marginRight: '10px',
              color: '#545454',
              fontSize: { xs: '50px', pc: '30px' },
              marginLeft: {
                xs: '-18px',
                md: 'unset',
              },
            }}
          />
          <Typography
            sx={{ fontSize: { xs: '20px', pc: '20px' }, color: 'text.primary' }}
          >
            Mọi thông tin của bạn đều được bảo mật theo tiêu chuẩn quốc tế PCI
            DSSDSS
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="flex-end">
          <Button
            size="small"
            sx={{
              fontSize: {
                xs: '18px',
                pc: '20px',
              },
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: {
                xs: '47px',
                pc: '73px',
              },
              padding: '0 15px',
              width: {
                xs: '149px',
                pc: '231px',
              },
              fontWeight: 500,
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Lưu thông tin
          </Button>
        </Stack>
      </>
    );
  };

  const _renderCard = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          width: 'max-content',
          maxHeight: 'max-content',
        }}
      >
        <Box
          src={Assets.bankCardImage}
          component="img"
          sx={{ width: '100%', maxWidth: {md: '450px', xs: 380} }}
        />
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            top: '13%',
            left: '30%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData.bank.fullname}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            top: '44%',
            left: '30%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData?.bank?.accountNumber}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            bottom: '24%',
            left: '30%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData?.wallet?.balance || 0} USDT
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '13%',
            userSelect: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            {userData?.bank?.bankName}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          minHeight: {
            xs: 'calc(100vh - 70px)',
            md: 'calc(100vh - 180px)',
          },
          padding: {
            xs: '0',
          },
          margin: {
            xs: 0,
            md: '20px auto 0px auto',
          },
        }}
      >
        <Grid container>
          {isMd ? null : (
            <Grid
              item
              xs={12}
              md={2}
              width="100%"
              sx={{
                position: {
                  xs: 'sticky',
                  md: 'unset',
                },
                top: '70px',
                backgroundColor: 'background.default',
                zIndex: 1,
              }}
              borderTop="1px solid rgba(187, 174, 174, 0.9)"
            >
              <Sidebar />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={10}
            borderLeft="1px solid #949494"
            padding={{
              xs: '10px',
              pc: '60px 71px',
            }}
            borderTop="1px solid rgba(187, 174, 174, 0.9)"
          >
            <Stack
              component="form"
              direction="column"
              sx={{
                paddingRight: {
                  xs: 0,
                  md: '30px',
                },
                margin: {
                  xs: '10px',
                  md: 'auto',
                },
                width: {
                  xs: '100%',
                },
                maxWidth: '1105px',
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: '24px',
                    pc: '64px',
                  },
                  lineHeight: {
                    xs: '34px',
                    pc: '70px',
                  },
                  fontWeight: 600,
                  alignSelf: {
                    xs: 'center',
                    md: 'unset',
                  },
                }}
              >
                Liên kết tài khoản ngân hàng
              </Typography>
              {isMd ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  marginTop="20px"
                  padding={{ xs: '0 20px', md: 0 }}
                >
                  <Avatar
                    src={userData.avatar}
                    sx={{
                      width: { xs: '60px', pc: '93px' },
                      height: { xs: '60px', pc: '93px' },
                      marginRight: '20px',
                    }}
                  />
                  <Typography
                    sx={{
                      marginRight: '16px',
                      fontSize: {
                        xs: '24px',
                        pc: '25px',
                      },
                      fontWeight: 600,
                    }}
                  >
                    {userData.nickname}
                  </Typography>
                </Stack>
              ) : null}
              <Divider sx={{ marginTop: '6px', marginBottom: '15px' }} />

              <Stack direction="column" paddingRight="30px">
                {userData?.bank ? _renderCard() : _renderForm()}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return (
    <UserLayout
      content={renderMain()}
      screenTitle="Liên kết tài khoản ngân hàng"
    />
  );
};

export default ConnectBank;
