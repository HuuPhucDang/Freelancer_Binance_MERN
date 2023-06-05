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

function createData(
  price: number,
  quantity: number,
  total: number,
  direction: string,
  time: string
) {
  return { price, quantity, total, direction, time };
}

const rows = [
  createData(2634.56, 0.08648, 86.8989038, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.00265, 12.56879, 'down', '11:04:51'),
  createData(2623.66, 0.00473, 86.8989038, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 55.68797, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 6.86906, 'down', '11:04:51'),
  createData(2634.56, 0.00265, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 86.8989038, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.00265, 12.56879, 'down', '11:04:51'),
  createData(2623.66, 0.00473, 86.8989038, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 55.68797, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 6.86906, 'down', '11:04:51'),
  createData(2634.56, 0.00265, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 86.8989038, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),

  createData(2623.66, 0.09475, 82.5888, 'more', '11:04:51'),

  createData(2623.66, 0.00473, 1.136468, 'up', '11:04:50'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2634.56, 0.00265, 55.68797, 'up', '11:04:50'),
  createData(2623.66, 0.00473, 8.879789, 'up', '11:04:50'),
  createData(2634.56, 0.05766, 1.136468, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.00473, 1.136468, 'up', '11:04:50'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2634.56, 0.00265, 55.68797, 'up', '11:04:50'),
  createData(2623.66, 0.00473, 8.879789, 'up', '11:04:50'),
  createData(2634.56, 0.05766, 1.136468, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.00473, 1.136468, 'up', '11:04:50'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
];

const VolatilityTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 'calc(100vh - 220px)',
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
          {rows.map((row, index) => {
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
