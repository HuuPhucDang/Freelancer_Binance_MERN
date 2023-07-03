import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTypedDispatch } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';
// import AuthLayout from '@/Components/DefaultLayout/AuthLayout';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Utils } from '../../../Libs';
import { ROUTERS } from '../../../Constants';

const schema = yup
  .object({
    username: yup
      .string()
      .matches(
        /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|^([0-9]{10})$/,
        'Username must be valid phone or email'
      )
      .trim()
      .required('Username is a required field'),
    password: yup
      .string()
      .min(8, 'Password must be least at 8 characters')
      .matches(/[a-z]+/, 'Password must be contain 1 lowercase character')
      .matches(/\d+/, 'Password must be contain 1 number')
      .trim()
      .required('Password is a required field'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Confirm password must match')
      .min(8, 'Confirm password must be least at 8 characters')
      .trim()
      .required('Confirm password is a required field'),
    inviteCode: yup.string().trim().required('Invite code is a required field'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const { register } = AuthActions;

const SignUp = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useTypedDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const buttonRef = React.useRef<any>(null);

  // React.useEffect(() => {
  //   if (isLogged) Utils.redirect(ROUTERS.TRANSACTION);
  // }, [isLogged]);

  const onSubmit = (data: FormData) => dispatch(register(data));

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
          maxWidth: '432px',
          margin: {
            xs: '40px 0',
            md: 'auto',
          },
        }}
      >
        <Helmet>
          <title>Đăng ký</title>
        </Helmet>
        <Stack
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
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '24px', pc: '40px' },
              fontWeight: 700,
              lineHeight: '40px',
              marginBottom: '20px',
            }}
          >
            {isMd ? 'Tạo tài khoản cá nhân' : 'Đăng ký'}
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
                placeholder="Email, Số ĐT *"
                sx={{
                  marginTop: {
                    xs: 0,
                    md: '10px',
                  },
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                  input: {
                    height: { xs: '32px', pc: '42px' },
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
            <Typography sx={{ fontSize: '20px', marginTop: '16px' }}>
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
                placeholder="Mật khẩu *"
                type="password"
                sx={{
                  marginTop: {
                    xs: 0,
                    md: '10px',
                  },
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                  input: {
                    height: { xs: '32px', pc: '42px' },
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message}
                {...field}
              />
            )}
          />
          {isMd ? (
            <Typography sx={{ fontSize: '20px', marginTop: '16px' }}>
              Xác nhận mật khẩu
            </Typography>
          ) : null}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Xác nhận mật khẩu *"
                type="password"
                sx={{
                  marginTop: {
                    xs: 0,
                    md: '10px',
                  },
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                  input: {
                    height: { xs: '32px', pc: '42px' },
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.confirmPassword?.message)}
                helperText={errors?.confirmPassword?.message}
                {...field}
              />
            )}
          />
          {isMd ? (
            <Typography sx={{ fontSize: '20px', marginTop: '16px' }}>
              Mã mời
            </Typography>
          ) : null}
          <Controller
            name="inviteCode"
            control={control}
            render={({ field }) => (
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Mã mời *"
                sx={{
                  marginTop: {
                    xs: 0,
                    md: '10px',
                  },
                  color: 'text.secondary',
                  ' .MuiInputBase-root': {
                    backgroundColor: 'background.secondary',
                  },
                  input: {
                    height: { xs: '32px', pc: '42px' },
                  },
                }}
                onKeyUp={onEnter}
                error={Boolean(errors?.inviteCode?.message)}
                helperText={errors?.inviteCode?.message}
                {...field}
              />
            )}
          />
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
            Đăng ký
          </Button>
          {isMd ? null : (
            <Typography
              sx={{
                fontSize: '14px',
                textDecoration: 'underline',
                textAlign: 'center',
                color: 'text.primary',
                marginTop: '2em',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => Utils.redirect(ROUTERS.SIGN_IN)}
            >
              Đăng nhập
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  };

  return _renderMain();
};

export default SignUp;
