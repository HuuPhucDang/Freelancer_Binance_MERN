import React from 'react';
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
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { Select } from '@/Components/Common';
import { TransactionActions } from '../../../Reducers/Actions';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { ENUMS } from '../../../Constants';
import { Utils } from '../../../Libs';

interface IFilterParam {
  type: string;
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  populate: string;
}

interface ITransaction {
  amount: number;
  balance: number;
  date: string;
  status: string;
  time: string;
  type: string;
}

interface IPayload {
  limit: number;
  page: number;
  results: ITransaction[];
  totalPages: number;
  totalResults: number;
}

function createData(
  date: string,
  time: string,
  type: string,
  status: string,
  total: number,
  surplus: number
) {
  return { date, time, type, status, total, surplus };
}

const initialFilterParam = {
  type: 'all',
  status: 'all',
  page: 1,
  limit: 15,
  sortBy: 'date:DESC,time:DESC',
  populate: "userId"
};

const { fetchTransactions } = TransactionActions;

const Invoice: React.FC = () => {
  // Constructors
  const dispatch = useTypedDispatch();
  const payload: IPayload = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'payload')
  );
  const [filterParams, setFilterParams] =
    React.useState<IFilterParam>(initialFilterParam);

  const fetchPayload = async () => {
    const resolveFilters = Utils.resolveFilter(filterParams);
    dispatch(fetchTransactions(resolveFilters));
  };

  React.useEffect(() => {
    fetchPayload();
  }, [filterParams]);

  const rows = React.useMemo(() => {
    const result: any[] = [];
    if (payload.results && payload.results?.length > 0) {
      payload.results.forEach((item: ITransaction) =>
        result.push(
          createData(
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

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: {
            xs: 0,
            md: '1em 0',
          },
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid
            item
            xs={12}
            md={2.5}
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
          >
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={9.5} borderLeft="1px solid #949494">
            <Stack
              direction="column"
              padding={{
                xs: '10px',
                md: '0',
              }}
            >
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Lịch sử nạp rút
              </Typography>
              <Divider
                sx={{
                  marginTop: '4px',
                  marginBottom: '40px',
                  marginRight: '50px',
                }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: '22px' }}>Giao dịch</Typography>
                <Stack direction="row">
                  <Select
                    placeholder="Loại"
                    options={[
                      { label: 'Tất cả', value: 'all' },
                      {
                        label: 'Rút tiền',
                        value: ENUMS.ETransactionType.WITHDRAW,
                      },
                      {
                        label: 'Nạp tiền',
                        value: ENUMS.ETransactionType.RECHARGE,
                      },
                      { label: 'Thưởng', value: ENUMS.ETransactionType.BONUS },
                    ]}
                    selected={filterParams.type}
                    onSelect={(newValue: string) =>
                      setFilterParams({ ...filterParams, type: newValue })
                    }
                    sx={{
                      marginRight: '10px',
                      backgroundColor: 'background.invoiceDropdown',
                    }}
                  />
                  <Select
                    placeholder="Trạng thái"
                    options={[
                      { label: 'Tất cả', value: 'all' },
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
                    onSelect={(newValue: string) =>
                      setFilterParams({ ...filterParams, status: newValue })
                    }
                    sx={{
                      backgroundColor: 'background.invoiceDropdown',
                    }}
                  />
                </Stack>
              </Stack>
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
                          fontSize: '14px',
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
                          fontSize: '14px',
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
                          fontSize: '14px',
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
                          fontSize: '14px',
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
                          fontSize: '14px',
                          padding: {
                            xs: '15px 5px',
                            md: '15px',
                          },
                          width: '110px',
                        }}
                      >
                        Số tiền
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '14px',
                          padding: {
                            xs: '15px 5px',
                            md: '15px',
                          },
                          width: '110px',
                        }}
                      >
                        Số dư
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
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
                              fontSize: '13px',
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
                              fontSize: '13px',
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
                              fontSize: '13px',
                              lineHeight: '24px',
                              color: 'text.primary',
                            }}
                          >
                            {row.type}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: '13px',
                              lineHeight: '24px',
                              color: 'text.primary',
                            }}
                          >
                            {row.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: '13px',
                              lineHeight: '24px',
                              color: 'text.primary',
                            }}
                          >
                            ${row.total}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: '13px',
                              lineHeight: '24px',
                              color: 'text.primary',
                            }}
                          >
                            ${row.surplus}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Lịch sử nạp rút" />;
};

export default Invoice;
