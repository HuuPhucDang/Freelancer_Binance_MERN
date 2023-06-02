import { Button, Stack, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { useTypedDispatch, useTypedSelector } from '@/Reducers/store';
import { AuthActions } from '@/Reducers/Actions';
import React from 'react';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import { ForgotPassword } from '../../../Components/Popup';

const { setLogged } = AuthActions;

const SignIn = () => {
  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false);
  const isLogged: any = useTypedSelector((state: any) =>
    _.get(state.AUTH, 'isLogged')
  );
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    if (isLogged) Utils.redirect(ROUTERS.TRANSACTION);
  }, [isLogged]);

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
      <ForgotPassword
        open={isShowPopup}
        onClose={() => setIsShowPopup(false)}
      />
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
          Đăng nhập
        </Typography>
        <TextField
          hiddenLabel
          variant="outlined"
          size="small"
          placeholder="Email"
          sx={{
            marginTop: '10px',
            backgroundColor: 'background.secondary',
            color: 'text.secondary',
          }}
        />
        <TextField
          hiddenLabel
          variant="outlined"
          size="small"
          placeholder="Mật khẩu"
          sx={{
            marginTop: '10px',
            backgroundColor: 'background.secondary',
            color: 'text.secondary',
          }}
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
          onClick={() => dispatch(setLogged())}
        >
          Đăng nhập
        </Button>
        <Typography
          sx={{
            fontSize: '14px',
            textDecoration: 'underline',
            textAlign: 'center',
            marginTop: '2em',
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
    </Stack>
  );
};

export default SignIn;
