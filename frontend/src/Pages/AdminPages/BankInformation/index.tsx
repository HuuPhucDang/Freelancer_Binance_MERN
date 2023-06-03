import {
  Box,
  Button,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AdminLayout } from '../../../Components/DefaultLayout';
import Assets from '../../../Assets';

const BankInformation = () => {
  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Thông tin ngân hàng
        </Typography>
        <Grid container maxWidth="800px" spacing={4}>
          <Grid item xs={8}>
            <Stack direction="column" spacing={2}>
              <FormControl>
                <InputLabel
                  htmlFor="component-outlined-name"
                  sx={{ color: 'text.primary' }}
                >
                  Họ và tên người nhận
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-name"
                  label="Họ và tên người nhận"
                  sx={{
                    backgroundColor: 'background.chargeInput',
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="component-outlined-number"
                  sx={{ color: 'text.primary' }}
                >
                  Số tài khoản
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-number"
                  label="Số tài khoản"
                  sx={{
                    backgroundColor: 'background.chargeInput',
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="component-outlined-bank"
                  sx={{ color: 'text.primary' }}
                >
                  Ngân hàng
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-bank"
                  label="Ngân hàng"
                  sx={{
                    backgroundColor: 'background.chargeInput',
                  }}
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  htmlFor="component-outlined-desc"
                  sx={{ color: 'text.primary' }}
                >
                  Nội dung
                </InputLabel>
                <OutlinedInput
                  id="component-outlined-desc"
                  label="Nội dung"
                  sx={{
                    backgroundColor: 'background.chargeInput',
                  }}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <input type="file" />
              <Box
                component="img"
                src={Assets.qrImage}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  marginTop: '16px',
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                color="yellowOrange"
                sx={{ textTransform: 'unset' }}
              >
                Cập nhật
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };
  return (
    <AdminLayout content={_renderMain()} screenTitle="Thông tin ngân hàng" />
  );
};

export default BankInformation;
