import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/material';

interface IProps {
  open: boolean;
  onClose(): void;
}

const ForgotPassword: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>Quên mật khẩu</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Để yêu cầu cấp lại mật khẩu. Vui lòng nhập email và thông tin liên lạc
          (Email, Số ĐT, Viber, ...) tại đây.
        </DialogContentText>
        <Stack direction="column">
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            type="text"
            placeholder="Tên đăng nhập"
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
            placeholder="Thông tin liên lạc (Email, Số ĐT, Viber,...)"
            sx={{
              marginTop: '10px',
              backgroundColor: 'background.secondary',
              color: 'text.secondary',
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'unset' }} onClick={onClose} color="error">
          Hủy
        </Button>
        <Button
          sx={{
            textTransform: 'unset',
            backgroundColor: 'background.burntSienna',
          }}
          variant="contained"
          onClick={onClose}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
