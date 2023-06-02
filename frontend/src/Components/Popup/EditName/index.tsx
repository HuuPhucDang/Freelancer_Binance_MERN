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

const EditName: React.FC<IProps> = ({ open = false, onClose }) => {
  const [name, setName] = React.useState<string>('Anonymous-User-b5b47p');
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>Chỉnh sửa tên</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '12px', color: 'text.primary' }}>
          Tên chỉ phục vụ việc hiển thị , không có giá trị sử dụng , có thể sử
          dụng tên ảo
        </DialogContentText>
        <Stack direction="column">
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditName;
