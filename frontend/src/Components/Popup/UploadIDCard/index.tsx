import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, Stack } from '@mui/material';

interface IProps {
  open: boolean;
  onClose(): void;
}

const UploadIDCard: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Cập nhật thẻ CCCD/CMND
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Vui lòng tải lên ảnh nhìn rõ, không bị chóa, mờ
        </DialogContentText>
        <Box
          component="img"
          src="https://binhthuan.gov.vn/SiteFolders/bandantoc/hinh%20anh%202021/03.38.cccd.jpg"
          sx={{ width: '100%' }}
        />
        <Grid container>
          <Grid item xs={6}>
            <input type="file" />
          </Grid>
          <Grid item xs={6}>
            <input type="file" />
          </Grid>
        </Grid>
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
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadIDCard;
