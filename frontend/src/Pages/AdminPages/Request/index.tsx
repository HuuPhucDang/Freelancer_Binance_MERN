import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
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
import SyncLockIcon from '@mui/icons-material/SyncLock';

import { AdminLayout } from '@/Components/DefaultLayout';
import { ResetPassword } from '@/Components/Popup';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { UserRequestActions } from '@/Reducers/Actions';

interface IUser {
  nickname: string;
}

interface IRequest {
  date: string;
  id: number;
  time: string;
  type: 'forgot_password';
  message: string;
  userId: IUser;
}

interface IPayload {
  limit: number;
  page: number;
  results: IRequest[];
  totalPages: number;
  totalResults: number;
}

interface ICreateData {
  name: string;
  type: 'forgot_password';
  message: string;
  createdAt: string;
  action: React.ReactNode;
}

function createData(
  name: string,
  type: 'forgot_password',
  message: string,
  createdAt: string,
  action: React.ReactNode
) {
  return { name, type, message, createdAt, action };
}

interface IFilterParam {
  sortBy: string;
  populate: string;
  page: number;
  limit: number;
}

const initialFilterParams = {
  sortBy: 'createAt:desc',
  populate: 'userId',
  page: 1,
  limit: 15,
};

const types = {
  forgot_password: 'Quên mật khẩu',
};

const { fetchUserRequests } = UserRequestActions;

const Request: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [isShowResetPassword, setIsShowResetPassword] =
    React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.USER_REQUEST, 'payload')
  );

  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParams);

  React.useEffect(() => {
    dispatch(fetchUserRequests(filterParams));
  }, [filterParams]);

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results.length > 0) {
      payload.results.map((item: IRequest) =>
        result.push(
          createData(
            item.userId.nickname,
            item.type,
            item.message,
            `${item.date}, ${item.time}`,
            <IconButton
              size="small"
              onClick={() => {
                setCurrentUser(item.userId);
                setIsShowResetPassword(true);
              }}
            >
              <SyncLockIcon
                sx={{
                  fontSize: { xs: '10px', pc: '40px' },
                }}
              />
            </IconButton>
          )
        )
      );
    }
    return result;
  }, [payload]);

  const _renderMain = () => {
    return (
      <Stack
        sx={{
          padding: {
            xs: '0px',
            md: '20px',
          },
        }}
        direction="column"
      >
        <ResetPassword
          user={currentUser}
          open={isShowResetPassword}
          onClose={() => {
            setIsShowResetPassword(false);
            setCurrentUser(null);
          }}
        />
        <Typography
          sx={{ fontSize: { xs: '10px', pc: '30px' }, fontWeight: 700 }}
        >
          Yêu cầu
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: {
              xs: '4px',
              md: '30px',
            },
          }}
        >
          <Table
            sx={{
              minWidth: {
                xs: '100%',
                md: 650,
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '5px', md: '14px', pc: '20px' },
                    padding: {
                      xs: '4px',
                    },
                  }}
                >
                  Người dùng
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '5px', md: '14px', pc: '20px' },
                    padding: {
                      xs: '4px',
                    },
                  }}
                >
                  Loại yêu cầu
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '5px', md: '14px', pc: '20px' },
                    padding: {
                      xs: '4px',
                    },
                  }}
                >
                  Tin nhắn
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '5px', md: '14px', pc: '20px' },
                    padding: {
                      xs: '4px',
                    },
                  }}
                >
                  Thời gian
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '5px', md: '14px', pc: '20px' },
                    padding: {
                      xs: '4px',
                    },
                  }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row: ICreateData, index: number) => (
                  <TableRow
                    key={`row-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                        },
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                        },
                      }}
                    >
                      {types[row.type]}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                        },
                      }}
                    >
                      {row.message}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                        },
                      }}
                    >
                      {row.createdAt}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                        },
                      }}
                    >
                      {row.action}
                    </TableCell>
                  </TableRow>
                ))}
              {rows.length === 0 && (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: { xs: '5px', pc: '20px' },
                      padding: {
                        xs: '4px',
                        md: '16px',
                      },
                    }}
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
              onChange={(_e: any, newPage: number) =>
                setFilterParams({ ...filterParams, page: newPage })
              }
              shape="rounded"
            />
          </Stack>
        )}
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Yêu cầu" />;
};

export default Request;
