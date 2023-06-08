import { Button, Stack, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { useTypedDispatch, useTypedSelector } from '@/Reducers/store';
import React from 'react';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthActions } from '../../../Reducers/Actions';

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
  const dispatch = useTypedDispatch();
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (isLogged) Utils.redirect(ROUTERS.TRANSACTION);
  }, [isLogged]);

  const onSubmit = (data: FormData) => dispatch(register(data));

  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction="column"
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '30px 15px',
          minWidth: '300px',
        }}
      >
        <Typography
          sx={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}
        >
          Đăng ký
        </Typography>
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
                marginTop: '10px',
                color: 'text.secondary',
                ' .MuiInputBase-root': {
                  backgroundColor: 'background.secondary',
                },
              }}
              error={Boolean(errors?.username?.message)}
              helperText={errors?.username?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              hiddenLabel
              variant="outlined"
              size="small"
              placeholder="Mật khẩu *"
              sx={{
                marginTop: '10px',
                color: 'text.secondary',
                ' .MuiInputBase-root': {
                  backgroundColor: 'background.secondary',
                },
              }}
              error={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              hiddenLabel
              variant="outlined"
              size="small"
              placeholder="Xác nhận mật khẩu *"
              sx={{
                marginTop: '10px',
                color: 'text.secondary',
                ' .MuiInputBase-root': {
                  backgroundColor: 'background.secondary',
                },
              }}
              error={Boolean(errors?.confirmPassword?.message)}
              helperText={errors?.confirmPassword?.message}
              {...field}
            />
          )}
        />
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
                marginTop: '10px',
                color: 'text.secondary',
                ' .MuiInputBase-root': {
                  backgroundColor: 'background.secondary',
                },
              }}
              error={Boolean(errors?.inviteCode?.message)}
              helperText={errors?.inviteCode?.message}
              {...field}
            />
          )}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: '10px',
            backgroundColor: 'background.burntSienna',
            ':hover': {
              backgroundColor: 'background.burntSienna',
              filter: 'brightness(0.95)',
            },
          }}
          onClick={handleSubmit(onSubmit)}
        >
          Đăng ký
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignUp;
