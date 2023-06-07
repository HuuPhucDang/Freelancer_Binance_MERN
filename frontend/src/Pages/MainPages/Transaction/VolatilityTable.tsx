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
import React from 'react';

function createData(
  price: number,
  quantity: number,
  total: number,
  direction: string,
  time: string
) {
  return { price, quantity, total, direction, time };
}

const downItem = createData(2634.56, 0.08648, 86.8989038, 'down', '11:04:51');

const upItem = createData(2623.66, 0.00473, 1.136468, 'up', '11:04:50');

const centerRow = createData(2623.66, 0.09475, 82.5888, 'more', '11:04:51');

interface IProps {
  itemsPerCategory: number;
}

const VolatilityTable: React.FC<IProps> = ({ itemsPerCategory }) => {
  const [resolveRows, setResolveRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (itemsPerCategory) {
      const resolveDownItems = [];
      const resolveUpItems = [];
      for (let i = 0; i < itemsPerCategory; i++) {
        resolveDownItems.push(downItem);
        resolveUpItems.push(upItem);
      }
      const result = [...resolveDownItems, centerRow, ...resolveUpItems];
      setResolveRows(result);
    }
  }, [itemsPerCategory]);

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
          {resolveRows.map((row, index) => {
            if (row.direction === 'more')
              return (
                <TableRow
                  key={`row-${index}`}
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
                      27,160.01
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
              );
            return (
              <TableRow
                key={`row-${index}`}
                sx={{
                  '& .MuiTableCell-root': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" sx={{ p: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 9,
                      lineHeight: '11px',
                      color: row.direction === 'up' ? '#408827' : '#F21616',
                      p: '4px 0 4px 8px',
                      textAlign: 'left',
                    }}
                  >
                    {row.price}
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
                    {row.quantity}
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
                    {row.total}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VolatilityTable;
