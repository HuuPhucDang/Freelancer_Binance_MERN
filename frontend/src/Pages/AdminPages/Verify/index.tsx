import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
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
  Tooltip,
  Typography,
} from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { AdminLayout } from '@/Components/DefaultLayout';
import { VerifyDetails } from '@/Components/Popup';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { VerificationActions } from '@/Reducers/Actions';
import { ENUMS } from '@/Constants';
import { Utils } from '@/Libs';

interface IFilterParam {
  page: number;
  limit: number;
  sortBy: string;
  populate: string;
}

interface IUser {
  id: string;
  nickname: string;
}

interface IVerify {
  id: string;
  backImageUrl: number;
  frontImageUrl: number;
  selfieImageUrl: string;
  status: string;
  userId: IUser;
}

interface IPayload {
  limit: number;
  page: number;
  results: IVerify[];
  totalPages: number;
  totalResults: number;
}

const statusOptions: {
  [key: string]: {
    label: string;
    color: 'error' | 'success' | 'warning';
  };
} = {
  [ENUMS.EVerifyType.APPROVED]: {
    color: 'success',
    label: 'Đã duyệt',
  },
  [ENUMS.EVerifyType.PENDING]: {
    color: 'warning',
    label: 'Đang chờ',
  },
  [ENUMS.ETransactionStatus.DENIED]: {
    color: 'error',
    label: 'Đã từ chối',
  },
};

interface ICreateData {
  id: string;
  user: IUser;
  date: string;
  time: string;
  type: 'recharge' | 'withdraw' | 'bonus';
  status: string;
  total: number;
  surplus: number;
  view: React.ReactNode;
  action: React.ReactNode;
}

interface IFilterParam {
  sortBy: string;
  populate: string;
  page: number;
  limit: number;
}

function createData(
  id: string,
  user: IUser,
  status: string,
  view: React.ReactNode,
  action: React.ReactNode
) {
  return { id, user, status, view, action };
}

const initialFilterParam = {
  page: 1,
  limit: 15,
  sortBy: 'status:desc',
  populate: 'userId',
};

const { fetchAllVerification, approveVerification, denyVerification } =
  VerificationActions;

const Verify: React.FC = () => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  // const [isShowResetPassword, setIsShowResetPassword] =
  //   React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<any>(null);

  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.VERIFICATION, 'payload')
  );

  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParam);

  React.useEffect(() => {
    dispatch(fetchAllVerification(filterParams));
  }, [filterParams]);

  const onRowAction = (action: 'approve' | 'deny', item: IVerify) => {
    if (action === 'approve') {
      dispatch(approveVerification(item.userId.id, filterParams));
    } else if (action === 'deny')
      dispatch(denyVerification(item.userId.id, filterParams));
  };

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results?.length > 0) {
      payload.results.forEach((item: IVerify) =>
        result.push(
          createData(
            item.id,
            item.userId || userData,
            item.status,
            <IconButton
              size="small"
              onClick={() => setCurrentItem(item)}
              disabled={item.status === 'denied'}
            >
              <RemoveRedEyeOutlinedIcon
                sx={{
                  fontSize: { xs: '10px', pc: '40px' },
                }}
              />
            </IconButton>,
            <Stack direction="row" justifyContent="center">
              <Tooltip title="Chấp nhận">
                <span>
                  <IconButton
                    color="success"
                    onClick={() =>
                      item.status == 'pending' && onRowAction('approve', item)
                    }
                    disabled={item.status !== 'pending'}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        fontSize: { xs: '10px', pc: '40px' },
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Từ chối">
                <span>
                  <IconButton
                    color="error"
                    onClick={() =>
                      item.status == 'pending' && onRowAction('deny', item)
                    }
                    disabled={item.status !== 'pending'}
                  >
                    <DoDisturbIcon
                      sx={{
                        fontSize: { xs: '10px', pc: '40px' },
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
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
        <VerifyDetails
          item={currentItem}
          open={Boolean(currentItem)}
          onClose={() => {
            setCurrentItem(null);
          }}
        />
        <Typography
          sx={{ fontSize: { xs: '10px', pc: '30px' }, fontWeight: 700 }}
        >
          Xác minh
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
                  Trạng thái
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
                  Xem
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
                    key={`row-${index}-${row.id}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                          md: '16px',
                        },
                      }}
                    >
                      {row.user?.nickname}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        color={statusOptions[row.status]?.color}
                        label={statusOptions[row.status]?.label}
                        sx={{
                          width: {
                            xs: '40px',
                            md: '188px',
                          },
                          height: {
                            xs: '12px',
                            md: '56px',
                          },
                          borderRadius: '4px',
                          fontSize: { xs: '5px', md: '14px', pc: '20px' },
                          padding: {
                            xs: '4px',
                          },
                          span: {
                            padding: 0,
                          },
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                          md: '16px',
                        },
                      }}
                    >
                      {row.view}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: '5px', md: '14px', pc: '20px' },
                        padding: {
                          xs: '4px',
                          md: '16px',
                        },
                      }}
                    >
                      {row.action}
                    </TableCell>
                  </TableRow>
                ))}
              {rows.length === 0 && (
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: { xs: '5px', md: '14px', pc: '20px' } }}
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
  return <AdminLayout content={_renderMain()} screenTitle="Xác minh" />;
};

export default Verify;
