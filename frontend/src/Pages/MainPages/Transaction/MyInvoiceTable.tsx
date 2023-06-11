import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
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

const bottomRightRows = [
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 6.86906, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
];

const MyInvoiceTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "100%",
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
          {bottomRightRows.map((row, index) => (
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
                    color: row.direction === 'up' ? '#408827' : '#F21616',
                    padding: '4px 0',
                  }}
                >
                  {row.price}
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
                >
                  {row.quantity}
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
                >
                  {row.time}
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
