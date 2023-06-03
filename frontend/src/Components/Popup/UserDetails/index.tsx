import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface IProps {
  open: boolean;
  onClose(): void;
}

const RequestVerifyIDCard: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chi tiết người dùng
      </DialogTitle>
      <DialogContent>
        <Stack direction="column">
          <Stack direction="column" spacing={1}>
            <Typography>
              <b>Người dùng</b>: Anonymous-User-b5b47p
            </Typography>
            <Typography>
              <b>Email</b>: anonymous@email.com
            </Typography>
            <Typography>
              <b>Số điện thoại</b>: 0123487989
            </Typography>
          </Stack>
          <Accordion sx={{ marginTop: '10px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              defaultChecked
            >
              <Typography>Thông tin ngân hàng</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="column" spacing={2}>
                <Typography>
                  <b>Họ và tên</b>: ..........
                </Typography>
                <Typography>
                  <b>Số tài khoản</b>: ..........
                </Typography>
                <Typography>
                  <b>Ngân hàng</b>: ..........
                </Typography>
                <Typography>
                  <b>Chi nhánh</b>: ..........
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Xác thực</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{ fontWeight: 600, marginTop: '20px', marginBottom: '5px' }}
              >
                Ảnh CCCD/CMND
              </Typography>
              <Box
                component="img"
                src="https://binhthuan.gov.vn/SiteFolders/bandantoc/hinh%20anh%202021/03.38.cccd.jpg"
                sx={{ width: '100%' }}
              />
              <Typography
                sx={{ fontWeight: 600, marginTop: '20px', marginBottom: '5px' }}
              >
                Ảnh chân dung
              </Typography>
              <Box
                component="img"
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
                sx={{ width: '100%' }}
              />
            </AccordionDetails>
          </Accordion>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: 'unset', fontWeight: 600 }}
          onClick={onClose}
          color="error"
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestVerifyIDCard;
