import {
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { AdminLayout } from '@/Components/DefaultLayout';
import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { UserDetails } from '@/Components/Popup';
function createData(
  name: string,
  email: string,
  phone: string,
  status: 'active' | 'inactive' | 'pending',
  action: React.ReactNode
) {
  return { name, email, phone, status, action };
}

const statusOptions: {
  [key: string]: {
    label: string;
    color: 'error' | 'success' | 'warning';
  };
} = {
  active: {
    color: 'success',
    label: 'Hoạt động',
  },
  inactive: {
    color: 'error',
    label: 'Không hoạt động',
  },
  pending: {
    color: 'warning',
    label: 'Đang chờ duyệt',
  },
};

const Request = () => {
  const [status, setStatus] = React.useState<string>('');
  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false);

  const rows = [
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'active',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'active',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'pending',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'inactive',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'inactive',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'pending',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
    createData(
      'Anonymous-User-b5b47',
      'example1@email.com',
      '01238919238',
      'inactive',
      <IconButton size="small" onClick={() => setIsShowPopup(true)}>
        <RemoveRedEyeOutlinedIcon />
      </IconButton>
    ),
  ];

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <UserDetails open={isShowPopup} onClose={() => setIsShowPopup(false)} />
        <Typography sx={{ fontSize: '17px', fontWeight: 600 }}>
          Người dùng
        </Typography>
        <Stack direction="row" marginTop="20px" spacing={2}>
          <FormControl size="small">
            <InputLabel
              htmlFor="component-outlined-name"
              sx={{ color: 'text.primary' }}
            >
              Từ khóa
            </InputLabel>
            <OutlinedInput
              id="component-outlined-name"
              label="Từ khóa"
              defaultValue=""
            />
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
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: 'unset' }}
          >
            Tìm kiếm
          </Button>
        </Stack>
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Tên người dùng</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Số điện thoại
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Trạng thái
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
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">
                    <Chip
                      color={statusOptions[row.status].color}
                      label={statusOptions[row.status].label}
                      sx={{ width: '130px', borderRadius: '5px' }}
                      variant="outlined"
                    />
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
