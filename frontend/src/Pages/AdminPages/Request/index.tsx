import {
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { AdminLayout } from '../../../Components/DefaultLayout';
import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { RequestConnectBank, RequestVerify } from '../../../Components/Popup';
function createData(
  name: string,
  category: 'connectBank' | 'verify',
  status: 'canceled' | 'accepted' | 'pending',
  createdAt: Date,
  action: React.ReactNode
) {
  return { name, category, status, createdAt, action };
}

const categoryOptions = {
  connectBank: 'Liên kết ngân hàng',
  verify: 'Xác minh',
};

const statusOptions: {
  [key: string]: {
    label: string;
    color: 'error' | 'success' | 'warning';
  };
} = {
  canceled: {
    color: 'error',
    label: 'Đã hủy',
  },
  accepted: {
    color: 'success',
    label: 'Đã duyệt',
  },
  pending: {
    color: 'warning',
    label: 'Đang chờ',
  },
};

const Request = () => {
  const [status, setStatus] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [isShowBankDetailsPopup, setIsShowBankDetailsPopup] =
    React.useState<boolean>(false);
  const [isShowVerifyPopup, setIsShowVerifyPopup] =
    React.useState<boolean>(false);

  const rows = [
    createData(
      'Anonymous-User-b5b47',
      'connectBank',
      'pending',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowBankDetailsPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'verify',
      'accepted',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowVerifyPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'verify',
      'pending',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowVerifyPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'connectBank',
      'canceled',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowBankDetailsPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'connectBank',
      'accepted',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowBankDetailsPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'connectBank',
      'canceled',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowBankDetailsPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'verify',
      'pending',
      new Date(),
      <IconButton size="small" onClick={() => setIsShowVerifyPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
  ];

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <RequestVerify
          open={isShowVerifyPopup}
          onClose={() => setIsShowVerifyPopup(false)}
        />
        <RequestConnectBank
          open={isShowBankDetailsPopup}
          onClose={() => setIsShowBankDetailsPopup(false)}
        />
        <Typography sx={{ fontSize: '17px', fontWeight: 600 }}>
          Yêu cầu
        </Typography>
        <Stack direction="row" marginTop="20px" spacing={2}>
          <FormControl sx={{ width: '240px' }} size="small">
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: 'text.primary' }}
            >
              Loại
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Loại"
              onChange={(e: any) => setCategory(e.target.value as string)}
            >
              <MenuItem value="verify">Xác minh</MenuItem>
              <MenuItem value="connectBank">Liên kết ngân hàng</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '240px' }} size="small">
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: 'text.primary' }}
            >
              Trạng thái
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Trạng thái"
              onChange={(e: any) => setStatus(e.target.value as string)}
            >
              <MenuItem value="pending">Chờ duyệt</MenuItem>
              <MenuItem value="accepted">Đã duyệt</MenuItem>
              <MenuItem value="canceled">Đã hủy</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" size="small">
            Tìm kiếm
          </Button>
        </Stack>
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Người dùng</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Loại yêu cầu
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Trạng thái
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Thời gian
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {categoryOptions[row.category]}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      color={statusOptions[row.status].color}
                      label={statusOptions[row.status].label}
                      sx={{ width: '100px', borderRadius: '5px' }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {row.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ marginTop: '15px' }}
        >
          <Pagination count={10} shape="rounded" />
        </Stack>
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Yêu cầu" />;
};

export default Request;
