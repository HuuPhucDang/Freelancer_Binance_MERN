import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Typography,
  Divider,
  Box,
  Pagination,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
// import { CommonStyles } from '@/Components/Common';
import { Select } from '@/Components/Common';
import { TransactionActions } from '@/Reducers/Actions';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { ENUMS } from '@/Constants';
import { Utils } from '@/Libs';
import utils from '../../../Libs/utils';

interface IFilterParam {
  type: string;
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  populate: string;
}

interface ITransaction {
  id: string;
  amount: number;
  balance: number;
  date: string;
  status:
    | ENUMS.ETransactionStatus.CANCELED
    | ENUMS.ETransactionStatus.DENIED
    | ENUMS.ETransactionStatus.PENDING
    | ENUMS.ETransactionStatus.RESOLVED;
  time: string;
  type:
    | ENUMS.ETransactionType.BONUS
    | ENUMS.ETransactionType.RECHARGE
    | ENUMS.ETransactionType.WITHDRAW;
}

interface IPayload {
  limit: number;
  page: number;
  results: ITransaction[];
  totalPages: number;
  totalResults: number;
}

interface ICreateData {
  id: string;
  date: string;
  time: string;
  type:
    | ENUMS.ETransactionType.BONUS
    | ENUMS.ETransactionType.RECHARGE
    | ENUMS.ETransactionType.WITHDRAW;
  status:
    | ENUMS.ETransactionStatus.CANCELED
    | ENUMS.ETransactionStatus.DENIED
    | ENUMS.ETransactionStatus.PENDING
    | ENUMS.ETransactionStatus.RESOLVED;
  total: number;
  balance: number;
}

function createData(
  id: string,
  date: string,
  time: string,
  type:
    | ENUMS.ETransactionType.BONUS
    | ENUMS.ETransactionType.RECHARGE
    | ENUMS.ETransactionType.WITHDRAW,
  status:
    | ENUMS.ETransactionStatus.CANCELED
    | ENUMS.ETransactionStatus.DENIED
    | ENUMS.ETransactionStatus.PENDING
    | ENUMS.ETransactionStatus.RESOLVED,
  total: number,
  balance: number
) {
  return { id, date, time, type, status, total, balance };
}

const initialFilterParam = {
  type: '',
  status: '',
  page: 1,
  limit: 15,
  sortBy: 'date:desc,time:desc',
  populate: 'userId',
};

const { fetchTransactions, cancelTransaction } = TransactionActions;

const types = {
  [ENUMS.ETransactionType.RECHARGE]: 'Nạp',
  [ENUMS.ETransactionType.WITHDRAW]: 'Rút',
  [ENUMS.ETransactionType.BONUS]: 'Thưởng',
};

const status = {
  [ENUMS.ETransactionStatus.CANCELED]: 'Đã hủy',
  [ENUMS.ETransactionStatus.DENIED]: 'Đã từ chối',
  [ENUMS.ETransactionStatus.PENDING]: 'Đang chờ',
  [ENUMS.ETransactionStatus.RESOLVED]: 'Đã giải quyết',
};

const Invoice: React.FC = () => {
  // Constructors
  const userData = utils.getUserData();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useTypedDispatch();
  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'payload')
  );
  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParam);
  // const themeMode = Utils.getThemeMode();

  const fetchPayload = async () => {
    const resolveFilters = Utils.resolveFilter(filterParams);
    dispatch(fetchTransactions(resolveFilters));
  };

  React.useEffect(() => {
    fetchPayload();
  }, [filterParams]);

  const onCancel = (item: { id: string }) => {
    const resolveFilterParams = Utils.resolveFilter(filterParams);
    dispatch(cancelTransaction(item.id, resolveFilterParams));
  };

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results?.length > 0) {
      payload.results.forEach((item: ITransaction) =>
        result.push(
          createData(
            item.id,
            item.date,
            item.time,
            item.type,
            item.status,
            item.amount,
            item.balance
          )
        )
      );
    }
    return result;
  }, [payload]);

  const _renderDesktopTable = () => {
    return (
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          marginTop: '20px',
          boxShadow: 'none',
          borderRadius: '0',
        }}
      >
        <Table
          size="small"
          sx={{
            // maxWidth: '100%',
            backgroundColor: 'background.mainContent',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: '110px',
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                }}
              >
                Ngày tháng
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                  width: '110px',
                }}
              >
                Thời gian
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                  width: '110px',
                }}
              >
                Loại
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                  width: '110px',
                }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                  width: '110px',
                }}
              >
                Số lượng (USDT)
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                  width: '110px',
                }}
              >
                Số dư (USDT)
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: {
                    xs: '14px',
                    pc: '20px',
                  },
                  padding: {
                    xs: '15px 5px',
                    md: '15px',
                  },
                  width: '110px',
                }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ padding: '15px' }}
                  colSpan={7}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '13px',
                        pc: '20px',
                      },
                      lineHeight: '24px',
                      color: 'text.primary',
                      fontWeight: 600,
                    }}
                  >
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {rows.length > 0 &&
              rows.map((row: ICreateData, index: number) => (
                <TableRow
                  key={`row-${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: '15px' }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                      }}
                    >
                      {row.date}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                      }}
                    >
                      {row.time}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                        fontWeight: 600,
                      }}
                    >
                      {types[row?.type]}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                        fontWeight: 600,
                      }}
                    >
                      {status[row.status]}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                      }}
                    >
                      {row.total}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                      }}
                    >
                      {row.balance}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: { xs: '13px', pc: '20px' },
                        lineHeight: '24px',
                        color: 'text.primary',
                        opacity: row.status === 'pending' ? 1 : 0.5,
                        textDecoration:
                          row.status === 'pending' ? 'underline' : 'unset',
                        ':hover': {
                          cursor:
                            row.status === 'pending'
                              ? 'pointer'
                              : 'not-allowed',
                        },
                      }}
                      onClick={() => onCancel(row)}
                    >
                      Hủy
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const _renderMobileTable = () => {
    return (
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          marginTop: '20px',
          boxShadow: 'none',
          borderRadius: '0',
        }}
      >
        <Table
          size="small"
          sx={
            {
              // maxWidth: '100%',
            }
          }
          aria-label="simple table"
        >
          <TableBody>
            {rows.length === 0 && (
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ padding: '15px' }}
                  colSpan={7}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '13px',
                        pc: '20px',
                      },
                      lineHeight: '24px',
                      color: 'text.primary',
                      fontWeight: 600,
                    }}
                  >
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {rows.length > 0 &&
              rows.map((row: ICreateData, index: number) => (
                <TableRow
                  key={`row-${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ padding: '15px' }}
                  >
                    <Stack direction="column">
                      <Typography
                        sx={{
                          fontSize: { xs: '20px', pc: '20px' },
                          lineHeight: '24px',
                          color: 'text.primary',
                          fontWeight: 600,
                        }}
                      >
                        {types[row?.type]}
                      </Typography>
                      <Stack direction="row">
                        <Typography
                          sx={{
                            fontSize: { xs: '16px', pc: '20px' },
                            lineHeight: '24px',
                            color: '#545454',
                          }}
                        >
                          {row.date}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: '16px', pc: '20px' },
                            lineHeight: '24px',
                            color: '#545454',
                          }}
                        >
                          {row.time}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    <Stack direction="column">
                      <Typography
                        sx={{
                          fontSize: { xs: '20px', pc: '20px' },
                          lineHeight: '24px',
                          color: 'text.primary',
                        }}
                      >
                        {row.balance}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '16px', pc: '20px' },
                          lineHeight: '24px',
                          color: '#545454',
                          fontWeight: 600,
                        }}
                      >
                        {status[row.status]}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          minHeight: {
            xs: '100%',
            md: 'calc(100vh - 180px)',
          },
          padding: {
            xs: '0',
          },
          margin: {
            xs: '0',
            md: '20px auto 0px auto',
          },
        }}
      >
        <Grid container>
          {isMd ? null : (
            <Grid
              item
              xs={12}
              md={2}
              width="100%"
              sx={{
                position: {
                  xs: 'sticky',
                  md: 'unset',
                },
                top: '70px',
                backgroundColor: 'background.default',
                zIndex: 1,
              }}
              borderTop="1px solid rgba(187, 174, 174, 0.9)"
            >
              <Sidebar />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={10}
            borderLeft="1px solid #949494"
            borderTop="1px solid rgba(187, 174, 174, 0.9)"
            padding={{
              xs: '10px',
              pc: '60px 71px',
            }}
          >
            <Stack
              direction="column"
              padding={{
                xs: '10px',
                md: '0',
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: '24px',
                    pc: '64px',
                  },
                  lineHeight: {
                    xs: '34px',
                    pc: '70px',
                  },
                  fontWeight: 600,
                  marginBottom: {
                    xs: 0,
                    md: '20px',
                  },
                  alignSelf: {
                    xs: 'center',
                    md: 'unset',
                  },
                }}
              >
                Lịch sử nạp rút
              </Typography>
              {isMd ? (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    marginTop="20px"
                    padding={{ xs: '0 20px', md: 0 }}
                  >
                    <Avatar
                      src={userData.avatar}
                      sx={{
                        width: { xs: '60px', pc: '93px' },
                        height: { xs: '60px', pc: '93px' },
                        marginRight: '20px',
                      }}
                    />
                    <Typography
                      sx={{
                        marginRight: '16px',
                        fontSize: {
                          xs: '24px',
                          pc: '25px',
                        },
                        fontWeight: 600,
                      }}
                    >
                      {userData.nickname}
                    </Typography>
                  </Stack>
                  <Divider sx={{ margin: '4px 0' }} />
                </>
              ) : null}
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: { xs: '22px', pc: '32px' } }}>
                  Giao dịch
                </Typography>
                {isMd ? null : (
                  <Stack direction="row">
                    <Select
                      placeholder="Loại"
                      options={[
                        { label: 'Tất cả', value: '' },
                        {
                          label: 'Rút tiền',
                          value: ENUMS.ETransactionType.WITHDRAW,
                        },
                        {
                          label: 'Nạp tiền',
                          value: ENUMS.ETransactionType.RECHARGE,
                        },
                        {
                          label: 'Thưởng',
                          value: ENUMS.ETransactionType.BONUS,
                        },
                      ]}
                      selected={filterParams?.type}
                      onSelect={(newValue: string) =>
                        setFilterParams({ ...filterParams, type: newValue })
                      }
                      sx={{
                        marginRight: '10px',
                        // backgroundColor: 'background.invoiceDropdown',
                      }}
                    />
                    <Select
                      placeholder="Trạng thái"
                      options={[
                        { label: 'Tất cả', value: '' },
                        {
                          label: 'Đang xử lý',
                          value: ENUMS.ETransactionStatus.PENDING,
                        },
                        {
                          label: 'Đã xử lý',
                          value: ENUMS.ETransactionStatus.RESOLVED,
                        },
                        {
                          label: 'Đã hủy',
                          value: ENUMS.ETransactionStatus.CANCELED,
                        },
                        {
                          label: 'Đã từ chối',
                          value: ENUMS.ETransactionStatus.DENIED,
                        },
                      ]}
                      selected={filterParams.status}
                      onSelect={(
                        newValue:
                          | ENUMS.ETransactionStatus.CANCELED
                          | ENUMS.ETransactionStatus.DENIED
                          | ENUMS.ETransactionStatus.PENDING
                          | ENUMS.ETransactionStatus.RESOLVED
                      ) =>
                        setFilterParams({ ...filterParams, status: newValue })
                      }
                      sx={
                        {
                          // backgroundColor: 'background.invoiceDropdown',
                        }
                      }
                    />
                  </Stack>
                )}
              </Stack>
              {isMd ? _renderMobileTable() : _renderDesktopTable()}
              {payload.totalPages > 0 && (
                <Pagination
                  count={payload.totalPages}
                  page={payload.page}
                  onChange={(_e: any, newPage: number) =>
                    setFilterParams({ ...filterParams, page: newPage })
                  }
                  shape="rounded"
                  sx={{ marginTop: '20px', alignSelf: 'end' }}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Lịch sử nạp rút" />;
};

export default Invoice;
