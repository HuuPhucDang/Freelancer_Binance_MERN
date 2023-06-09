import React from 'react';
import _ from 'lodash';
import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTypedDispatch, useTypedSelector } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import { ForgotPassword } from '@/Components/Popup';
// import AuthLayout from '@/Components/DefaultLayout/AuthLayout';
import { Helmet } from 'react-helmet-async';

const { login } = AuthActions;

const schema = yup
  .object({
    username: yup.string().trim().required('Username is a required field'),
    password: yup.string().trim().required('Password is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignIn = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false);
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  const buttonRef = React.useRef<any>(null);
  const token = Utils.getUserData();
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  React.useEffect(() => {
    if (isLogged && token && userData) Utils.redirect(ROUTERS.TRANSACTION);
  }, [isLogged]);

  const onSubmit = (data: FormData) => dispatch(login(data));

  const onEnter = (e: any) => {
    if (
      e.key === 'Enter' ||
      (e.keyCode === 13 && buttonRef && buttonRef.current)
    ) {
      buttonRef.current.click();
    }
  };

  const _renderMain = () => {
    return (
      <Stack
        padding={{ xs: '0', pc: '0' }}
        sx={{
          width: '100%',
          maxWidth: '420px',
          margin: { xs: '40px 0', md: '120px auto' },
        }}
      >
        <Helmet>
          <title>Đăng nhập</title>
        </Helmet>
        <ForgotPassword
          open={isShowPopup}
          onClose={() => setIsShowPopup(false)}
        />
        <Stack
          component="form"
          direction="column"
          sx={{
            border: {
              xs: 'unset',
              md: '1px solid #ccc',
            },
            borderRadius: '8px',
            padding: {
              xs: '0 30px',
              md: '30px 15px',
            },
            minWidth: '300px',
            backgroundColor: 'background.authBackground',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '24px', pc: '40px' },
              fontWeight: 700,
              lineHeight: '40px',
              marginBottom: '20px',
              color: '#000000',
            }}
          >
            Đăng nhập
          </Typography>
          {isMd ? (
            <Typography sx={{ fontSize: '20px' }}>Email, Số ĐT</Typography>
          ) : null}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Email"
                autoComplete="username"
                sx={{
                  marginTop: {
                    xs: 0,
                    md: '10px',
                  },
                  color: '#BBAEAE',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'rgba(217, 217, 217, 0.32)',
                    color: '#BBAEAE',
                    borderColor: '#999288',
                  },
                  input: {
                    height: { xs: '32px', pc: '42px' },
                  },
                  fieldset: {
                    borderColor: '#999288 !important',
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.username?.message)}
                helperText={errors?.username?.message}
                {...field}
              />
            )}
          />
          {isMd ? (
            <Typography sx={{ fontSize: '20px', marginTop: '24px' }}>
              Mật khẩu
            </Typography>
          ) : null}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mật khẩu"
                type="password"
                autoComplete="current-password"
                sx={{
                  marginTop: {
                    xs: '0px',
                    md: "10px",
                    pc: '24px',
                  },
                  color: '#BBAEAE',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'rgba(217, 217, 217, 0.32)',
                    color: '#BBAEAE',
                    // height: { xs: '32px', pc: '42px' },
                  },
                  input: {
                    height: { xs: '32px', pc: '42px' },
                  },
                  fieldset: {
                    borderColor: '#999288 !important',
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message}
                {...field}
              />
            )}
          />
          {isMd ? null : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                marginTop: '0.5em',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  textDecoration: 'underline',
                  textAlign: 'center',
                  color: 'text.primary',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => setIsShowPopup(true)}
              >
                Quên mật khẩu
              </Typography>
            </Stack>
          )}
          <Button
            variant="contained"
            sx={{
              marginTop: {
                xs: '50px',
                pc: '30px',
              },
              height: { xs: '64px', md: '36px' },
              fontSize: {
                xs: '24px',
                md: '14px',
              },
              width: {
                xs: '252px',
                md: '100%',
              },
              alignSelf: {
                xs: 'center',
                md: 'unset',
              },
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              ':hover': {
                backgroundColor: 'background.burntSienna',
                filter: 'brightness(0.95)',
              },
            }}
            ref={buttonRef}
            onClick={handleSubmit(onSubmit)}
          >
            Đăng nhập
          </Button>

          {isMd ? null : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
              spacing="40px"
              sx={{
                marginTop: '2em',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  textDecoration: 'underline',
                  textAlign: 'center',
                  color: 'text.primary',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => Utils.redirect(ROUTERS.HOME)}
              >
                Trang chủ
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  textDecoration: 'underline',
                  textAlign: 'center',
                  color: 'text.primary',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => Utils.redirect(ROUTERS.SIGN_UP)}
              >
                Đăng ký
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  };

  return _renderMain();
};

export default SignIn;
