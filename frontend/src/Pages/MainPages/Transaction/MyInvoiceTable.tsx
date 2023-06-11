import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  CircularProgress,
} from '@mui/material';
import { useEffect } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { useTypedDispatch, RootState } from '@/Reducers/store';
import { TradeActions } from '@/Reducers/Actions';

const { fetchTrades } = TradeActions;

const MyInvoiceTable = () => {
  const dispatch = useTypedDispatch();
  const allTrades: any = useSelector(
    (state: RootState) => _.get(state.TRADE, 'allTrades') || []
  );
  const isFetchLoading = useSelector((state: RootState) =>
    _.get(state.TRADE, 'isFetchLoading')
  );

  useEffect(() => {
    dispatch(fetchTrades());
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '100%',
        overflow: 'auto',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'unset',
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: 1,
          backgroundColor: 'transparent',
          backgroundImage: 'unset',
        }}
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
              }}
            >
              Giá (USDT)
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
              }}
            >
              Số lượng
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
              }}
            >
              Thời gian
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isFetchLoading && <CircularProgress />}
          {!isFetchLoading &&
            allTrades.map((row: any, index: number) => (
              <TableRow
                key={`row-${index}`}
                sx={{
                  '& .MuiTableCell-root': { border: 0 },
                }}
              >
                <TableCell align="center" scope="row" sx={{ padding: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      color: row.type === 'buy' ? '#408827' : '#F21616',
                      padding: '4px 0',
                    }}
                  >
                    {row?.betPrice}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ padding: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      padding: '4px 0',
                      color:
                        row.type === 'pending'
                          ? '#816A6A'
                          : row.type === 'win'
                          ? '#408827'
                          : '#F21616',
                    }}
                  >
                    {row?.betAmount}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ padding: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      padding: '4px 0',
                      color: '#816A6A',
                    }}
                    title={dayjs(row?.createdAt).format('DD/MM/YYYY')}
                  >
                    {dayjs(row?.createdAt).format('hh:mm:ss')}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyInvoiceTable;
