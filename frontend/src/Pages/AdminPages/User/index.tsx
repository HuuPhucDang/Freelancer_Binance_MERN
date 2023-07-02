import React from 'react';
import {
  Chip,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { AdminLayout } from '@/Components/DefaultLayout';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { UserActions } from '@/Reducers/Actions';
import { UserDetails } from '@/Components/Popup';

interface IUser {
  nickname: string;
}

interface IUser {
  id: string;
  avatar: string;
  nicknameE: string;
  ownCode: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  username: string;
  wallet?: any;
}

interface IPayload {
  limit: number;
  page: number;
  results: IUser[];
  totalPages: number;
  totalResults: number;
}

function createData(
  nickname: string,
  username: string,
  role: string,
  balance: number,
  status: 'active' | 'inactive',
  action: React.ReactNode
) {
  return { nickname, username, role, balance, status, action };
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

interface IFilterParam {
  sortBy: string;
  page: number;
  limit: number;
}

const initialFilterParams = {
  sortBy: 'createdAt:desc',
  page: 1,
  limit: 15,
  populate: 'wallet',
};

const { fetchUsers } = UserActions;

const Request = () => {
  const dispatch = useTypedDispatch();
  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.USER, 'payload')
  );
  const [currentUser, setCurrentUser] = React.useState<string>('');

  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParams);

  React.useEffect(() => {
    dispatch(fetchUsers(filterParams));
  }, [filterParams]);

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results.length > 0) {
      payload.results.map((item: IUser) => {
        result.push(
          createData(
            item.nickname,
            item.username,
            item.role,
            item.wallet?.balance,
            item.status,
            <IconButton
              onClick={() => setCurrentUser(item.id)}
              // disabled={item.role === 'admin'}
            >
              <RemoveRedEyeOutlinedIcon sx={{ fontSize: { pc: '40px' } }} />
            </IconButton>
          )
        );
      });
    }
    return result;
  }, [payload]);

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <UserDetails
          open={Boolean(currentUser)}
          onClose={() => setCurrentUser('')}
          currentUser={currentUser}
        />
        <Typography
          sx={{ fontSize: { xs: '17px', pc: '30px' }, fontWeight: 700 }}
        >
          Người dùng
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: { xs: '14px', pc: '20px' } }}
                >
                  Tên người dùng
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontWeight: 600, fontSize: { xs: '14px', pc: '20px' } }}
                >
                  Tên đăng nhập
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: { xs: '14px', pc: '20px' } }}
                >
                  Vai trò
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: { xs: '14px', pc: '20px' } }}
                >
                  Số dư (USDT)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: { xs: '14px', pc: '20px' } }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: { xs: '14px', pc: '20px' } }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row: any, index: number) => (
                  <TableRow
                    key={`row-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: { pc: '20px' } }}
                    >
                      {row.nickname}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: { pc: '20px' } }}>
                      {row.username}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        textTransform: 'capitalize',
                        fontSize: { pc: '20px' },
                      }}
                    >
                      {row.role}
                    </TableCell>
                    <TableCell
                      align="center"
                      // sx={{ textTransform: 'capitalize' }}
                      sx={{ fontSize: { pc: '20px' } }}
                    >
                      {Number(row?.balance || '0').toFixed(2)}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: { pc: '20px' } }}>
                      <Chip
                        color={statusOptions[row.status]?.color}
                        label={statusOptions[row.status]?.label}
                        sx={{
                          width: '188px',
                          height: '56px',
                          borderRadius: '0px',
                          fontSize: { pc: '20px' },
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{row.action}</TableCell>
                  </TableRow>
                ))}
              {rows.length === 0 && (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: { pc: '20px' } }}
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {payload.totalPages > 0 && (
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: '15px' }}
          >
            <Pagination
              count={payload.totalPages}
              page={payload.page}
              onChange={(_event: any, newPage) =>
                setFilterParams({ ...filterParams, page: newPage })
              }
              shape="rounded"
            />
          </Stack>
        )}
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Người dùng" />;
};

export default Request;
