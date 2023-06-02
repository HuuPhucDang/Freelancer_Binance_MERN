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
  Container,
} from '@mui/material';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { Select } from '@/Components/Common';

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

const rows = [
  createData('2023-05-20', '16:30', 'Rút tiền', 'Đã xử lý', 200, 4000),
  createData('2023-05-20', '16:30', 'Rút tiền', 'Đã xử lý', 200, 4000),
  createData('2023-05-20', '16:30', 'Rút tiền', 'Đã xử lý', 200, 4000),
  createData('2023-05-20', '16:30', 'Rút tiền', 'Đã xử lý', 200, 4000),
  createData('2023-05-20', '16:30', 'Rút tiền', 'Đã xử lý', 200, 4000),
  createData('2023-05-20', '16:30', 'Rút tiền', 'Đã xử lý', 200, 4000),
];

const Invoice: React.FC = () => {
  // Constructors
  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="md"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: '1em 0',
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5} borderLeft="1px solid #949494">
            <Stack direction="column">
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Lịch sử nạp rút
              </Typography>
              <Divider sx={{ marginTop: '4px', marginBottom: '40px', marginRight: '50px' }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: '22px' }}>Giao dịch</Typography>
                <Stack direction="row">
                  <Select
                    placeholder="Loại"
                    options={[
                      { label: 'Đang xử lý', value: 'processing' },
                      { label: 'Đã xử lý', value: 'approved' },
                      { label: 'Đã hủy', value: 'canceled' },
                      { label: 'Đã từ chối', value: 'disagreed' },
                    ]}
                    selected=""
                    onSelect={() => console.log('select')}
                    sx={{
                      marginRight: '10px',
                      backgroundColor: 'background.invoiceDropdown',
                    }}
                  />
                  <Select
                    placeholder="Thời gian"
                    options={[]}
                    selected=""
                    onSelect={() => console.log('select')}
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
                          padding: '15px',
                        }}
                      >
                        Ngày tháng
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '14px',
                          padding: '15px',
                          width: '110px',
                        }}
                      >
                        Thời gian
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '14px',
                          padding: '15px',
                          width: '110px',
                        }}
                      >
                        Loại
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '14px',
                          padding: '15px',
                          width: '110px',
                        }}
                      >
                        Trạng thái
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '14px',
                          padding: '15px',
                          width: '110px',
                        }}
                      >
                        Số tiền
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '14px',
                          padding: '15px',
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
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Lịch sử nạp rút" />;
};

export default Invoice;
