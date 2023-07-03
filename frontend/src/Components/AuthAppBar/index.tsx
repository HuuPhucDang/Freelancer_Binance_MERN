import { Box, Button, IconButton, Link, Stack } from '@mui/material';
import { ROUTERS } from '../../Constants';
import Assets from '../../Assets';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router';

const AuthAppBar = () => {
  const { pathname } = useLocation();
  return (
    <Stack direction="row">
      <Stack direction="row" sx={{ marginRight: '80px', height: 'inherit' }}>
        <Link
          href={ROUTERS.HOME}
          sx={{
            color: 'text.secondary',
            fontSize: '12px',
            display: 'inline-flex',
            height: {
              xs: 'inherit',
              md: '62px',
            },
            width: '124px',
            alignItems: 'center',
            padding: '0 6px',
          }}
        >
          <Box
            component="img"
            src={Assets.logoImage}
            sx={{ width: 150, height: '100%', objectFit: 'contain' }}
          />
        </Link>
      </Stack>
      <Stack
        flex={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {pathname === ROUTERS.SIGN_IN && (
          <Button
            variant="text"
            size="small"
            href={ROUTERS.SIGN_UP}
            sx={{
              fontSize: '16px',
              paddingX: '8px',
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: '35px',
              minWidth: '129px',
              marginRight: '10px',
            }}
          >
            Đăng ký
          </Button>
        )}
        {pathname === ROUTERS.SIGN_UP && (
          <Button
            variant="text"
            size="small"
            href={ROUTERS.SIGN_IN}
            sx={{
              fontSize: '16px',
              paddingX: '8px',
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: '35px',
              minWidth: '129px',
              marginRight: '10px',
            }}
          >
            Đăng nhập
          </Button>
        )}
        <IconButton
          sx={{
            padding: 0,
          }}
        >
          <MenuIcon
            sx={{
              color: '#000000',
              fontSize: {
                xs: '28px',
                pc: '50px',
              },
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};
export default AuthAppBar;
