import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack } from '@mui/material';

interface IProps {
  open: boolean;
  onClose(): void;
}

const UploadAvatar: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Cập nhật ảnh chân dung
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Vui lòng tải lên ảnh nhìn rõ, không bị chóa, mờ
        </DialogContentText>
        <Box
          component="img"
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
          sx={{ width: '100%' }}
        />
        <input type="file" />
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'unset' }} onClick={onClose} color="error">
          Hủy
        </Button>
        <Button
          sx={{ textTransform: 'unset', backgroundColor: 'background.burntSienna' }}
          variant="contained"
          onClick={onClose}
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadAvatar;
