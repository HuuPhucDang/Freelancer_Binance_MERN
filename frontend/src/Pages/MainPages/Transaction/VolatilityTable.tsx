import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Link,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { Utils } from '@/Libs';
interface IProps {
  symbol: string;
}

const VolatilityTable: React.FC<IProps> = ({ symbol }: IProps) => {
  const [latestRow, setLatestRow] = React.useState<any>({});
  const [upRows, setUpRows] = React.useState<any[]>([]);
  const [downRows, setDownRows] = React.useState<any[]>([]);

  const getAggregateData = (data: any) => {
    setDownRows((oldData) => {
      const filteredData = _.slice(data, 0, 38);
      const newData = [...oldData, ...filteredData];
      return newData.length > 60 ? newData.slice(-60) : newData;
    });
    setUpRows((oldData) => {
      const filteredData = _.slice(data, 39, 79);
      const newData = [...oldData, ...filteredData];
      return newData.length > 60 ? newData.slice(-60) : newData;
    });
    setLatestRow(_.last(data));
  };

  React.useEffect(() => {
    Utils.WebSocket.emit('getAggregateTradeList', { symbol }, getAggregateData);
    const intervalAggeList = setInterval(() => {
      Utils.WebSocket.emit(
        'getAggregateTradeList',
        { symbol, limit: 1 },
        (data: any) => {
          getAggregateData(data);
        }
      );
    }, 3000);
    Utils.WebSocket.on('updateAllCoinPriceNow', () => {
      Utils.WebSocket.emit(
        'getAggregateTradeList',
        { symbol, limit: 1 },
        (data: any) => {
          getAggregateData(data);
        }
      );
    });
    return () => {
      clearInterval(intervalAggeList);
    };
  }, [symbol]);

  const randomPage = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const _renderRows = (isUp: boolean) => {
    const sortedList = isUp ? upRows : downRows;
    const page = randomPage(0, 1);
    const randomSortList = _.slice(sortedList, page * 13, page * 13 + 13);
    return randomSortList.map((row) => {
      const total = row?.p * row?.q;
      return (
        <TableRow
          key={`${row?.E}-${row?.q}-${row?.T}-${row?.a}`}
          sx={{
            '& .MuiTableCell-root': { border: 0 },
          }}
        >
          <TableCell component="th" scope="row" sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: 9,
                lineHeight: '11px',
                color: isUp ? '#408827' : '#F21616',
                p: '4px 0 4px 8px',
                textAlign: 'left',
              }}
            >
              {row?.p}
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: 9,
                lineHeight: '11px',
                color: '#816A6A',
                p: '4px',
              }}
            >
              {row?.q}
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: 9,
                lineHeight: '11px',
                color: '#816A6A',
                padding: '4px 0',
              }}
            >
              {total.toFixed(4)}
            </Typography>
          </TableCell>
        </TableRow>
      );
    });
  };

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
                color: '#7D6F6F',
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
                color: '#7D6F6F',
              }}
            >
              Số lượng (EDU)
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: '10px',
                fontWeight: 400,
                padding: '4px 0',
                color: '#7D6F6F',
              }}
            >
              Tổng
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_renderRows(true)}
          <TableRow
            sx={{
              '& .MuiTableCell-root': { border: 0 },
            }}
          >
            <TableCell component="th" scope="row" sx={{ p: 0 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: '11px',
                  p: '10px 0 10px 8px',
                  textAlign: 'left',
                }}
              >
                {latestRow?.p}
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ p: 0 }}>
              <Typography
                sx={{
                  fontSize: 9,
                  lineHeight: '11px',
                  p: '4px',
                }}
              >
                $27,160.01
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ p: 0 }}>
              <Link
                sx={{
                  fontSize: 9,
                  lineHeight: '11px',
                  padding: '4px 0',
                }}
              >
                Xem thêm
              </Link>
            </TableCell>
          </TableRow>
          {_renderRows(false)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VolatilityTable;
