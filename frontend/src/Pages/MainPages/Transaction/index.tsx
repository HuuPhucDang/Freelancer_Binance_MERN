import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Box,
  Button,
  TextField,
  Chip,
  Container,
} from '@mui/material';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import DefaultLayout from '@/Components/DefaultLayout';
import StarIcon from '@mui/icons-material/Star';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StocksChart } from '@/Components/LayoutParts';
import Assets from '../../../Assets';
function createData(
  price: number,
  quantity: number,
  total: number,
  direction: string,
  time: string
) {
  return { price, quantity, total, direction, time };
}

function createTopRightData(label: string, price: number) {
  return { label, price };
}

const rows = [
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
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2634.56, 0.00265, 55.68797, 'up', '11:04:50'),
  createData(2623.66, 0.00473, 8.879789, 'up', '11:04:50'),
  createData(2634.56, 0.05766, 1.136468, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 6.86906, 'up', '11:04:50'),
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
  createData(2634.56, 0.00265, 12.56879, 'down', '11:04:51'),
  createData(2623.66, 0.00473, 86.8989038, 'down', '11:04:51'),
  createData(2634.56, 0.05766, 55.68797, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 6.86906, 'down', '11:04:51'),
  createData(2634.56, 0.00265, 82.5888, 'down', '11:04:51'),
];

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
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 86.8989038, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 82.5888, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 82.5888, 'up', '11:04:50'),
  createData(2623.66, 0.09475, 12.56879, 'up', '11:04:50'),
  createData(2623.66, 0.00975, 8.879789, 'down', '11:04:51'),
  createData(2634.56, 0.08648, 1.136468, 'down', '11:04:51'),
];

const topRightRows = [
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
  createTopRightData('1INCH/BTC ', 0.0000623),
];

const Transaction: React.FC = () => {
  // Constructors

  const _renderLeftSection = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container borderBottom="1px solid #ccc">
            <Grid item xs={3} borderRight="1px solid #ccc">
              <Stack padding="10px 4px">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: 600,
                      marginRight: '4px',
                    }}
                  >
                    BTC/USDT
                  </Typography>
                  <Box
                    component="img"
                    src={Assets.excelIcon}
                    sx={{
                      marginRight: '4px',
                    }}
                  />
                  <Typography sx={{ fontSize: '10px', fontWeight: 400 }}>
                    Bitcoin giá
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center" padding="4px">
                  <Chip
                    label="POW"
                    color="warning"
                    sx={{
                      marginRight: '10px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      padding: '0px',
                      height: '16px',
                      backgroundColor: 'background.chip',
                      color: 'text.burntSienna',
                    }}
                  />
                  <Chip
                    label="Top khối lượng"
                    color="warning"
                    sx={{
                      borderRadius: '4px',
                      fontSize: '10px',
                      padding: '0px',
                      height: '16px',
                      backgroundColor: 'background.chip',
                      color: 'text.burntSienna',
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={9}>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                height="100%"
              >
                <Stack direction="column">
                  <Typography sx={{ fontSize: '12px' }}>1.11435</Typography>
                  <Typography sx={{ fontSize: '12px' }}>$1.1111</Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: '12px' }}>
                    Biến động giá 24h{' '}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#C83535' }}>
                    -0.02260 -1.99%
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: '10px' }}>
                    Giá cao nhất 24h
                  </Typography>
                  <Typography sx={{ fontSize: '10px' }}>
                    1.1777717777
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: '10px' }}>
                    Giá thấp nhất 24h{' '}
                  </Typography>
                  <Typography sx={{ fontSize: '10px' }}>1.10659 </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography sx={{ fontSize: '10px' }}>KL 24h(EDU)</Typography>
                  <Typography sx={{ fontSize: '10px' }}>
                    32.754.791.0000
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} padding="0 !important">
          <Grid container>
            <Grid item xs={3.5} borderRight="1px solid #ccc" padding="0">
              <Stack
                flexDirection="row"
                marginBottom="16px"
                justifyContent="space-between"
              >
                <Box component="img" src={Assets.filterTypeImage} />
                <Stack direction="row" alignItems="center">
                  <Typography sx={{ fontSize: '10px' }}>0.000011</Typography>
                  <ArrowDropDownIcon sx={{ fontSize: '20px' }} />
                </Stack>
              </Stack>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 'calc(100vh - 258px)', overflow: 'auto' }}
              >
                <Table
                  size="small"
                  sx={{
                    minWidth: 1,
                    backgroundColor: 'transparent',
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
                          fontWeight: 600,
                          padding: '4px 0',
                        }}
                      >
                        Giá (USDT)
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '4px 0',
                        }}
                      >
                        Số lượng (EDU)
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '4px 0',
                        }}
                      >
                        Tổng
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
                          sx={{ padding: 0 }}
                        >
                          <Typography
                            sx={{
                              fontSize: '10px',
                              lineHeight: '24px',
                              color:
                                row.direction === 'up' ? '#408827' : '#F21616',
                              padding: '4px 0',
                            }}
                          >
                            {row.price}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ padding: 0 }}>
                          <Typography
                            sx={{
                              fontSize: '10px',
                              lineHeight: '24px',
                              color: 'text.primary',
                              padding: '4px 0',
                            }}
                          >
                            {row.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ padding: 0 }}>
                          <Typography
                            sx={{
                              fontSize: '10px',
                              lineHeight: '24px',
                              color: 'text.primary',
                              padding: '4px 0',
                            }}
                          >
                            {row.total}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={8.5}>
              <Stack direction="column">
                <Stack
                  sx={{
                    width: '100%',
                    maxWidth: '475px',
                    height: 'calc(100vh - 460px) !important',
                    background: '#000',
                  }}
                >
                  <StocksChart />
                </Stack>
                <Stack flex={1} padding="5px" sx={{ width: '100%' }}>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '13px' }}>Số dư</Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền khách bỏ ra để mua/ bán"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Giá ngay thời điểm hiện tại"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế nhận về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế trả về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Grid container spacing={0.5} marginTop="5px">
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                            fullWidth
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                            fullWidth
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              paddingX: '0',
                              minWidth: 'unset',
                            }}
                            fullWidth
                          >
                            Moonbot
                          </Button>
                        </Grid>
                      </Grid>
                      <Button
                        color="success"
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                          marginTop: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          background: '#408827',
                        }}
                      >
                        Mua
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '13px' }}>
                        Thời gian
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền khách bỏ ra để mua/ bán"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Giá ngay thời điểm hiện tại"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế nhận về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          height: '24px',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: 'background.secondary',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          placeholder="Số tiền thực tế trả về"
                          variant="filled"
                          sx={{
                            flex: 1,
                            input: {
                              padding: '6px 12px 6px 4px',
                              fontSize: '8px',
                            },
                            '> ::before': {
                              borderBottom: 'none',
                            },
                            '> ::after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                        <Typography
                          sx={{ marginLeft: '16px', fontSize: '8px' }}
                        >
                          USDT
                        </Typography>
                      </Stack>
                      <Grid container spacing={0.5} marginTop="5px">
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: '10px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.newsHeader',
                              color: 'text.secondary',
                              width: '45px',
                              minWidth: 'unset',
                            }}
                          >
                            Moonbot
                          </Button>
                        </Grid>
                      </Grid>
                      <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                          marginTop: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          background: '#F03030',
                        }}
                      >
                        Bán
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const _renderRightSection = () => {
    return (
      <Stack
        direction="column"
        // container
        // spacing={{ lg: 0, md: 2 }}
        borderLeft="1px solid #ccc"
        borderRight="1px solid #ccc"
        height="100%"
        maxHeight="calc(100vh - 148px)"
      >
        <Stack
          direction="column"
          flex={1}
          borderBottom="1px solid #ccc"
          sx={{ maxHeight: '50%' }}
        >
          <TableContainer
          sx={{ maxHeight: '100%', overflow: 'auto' }}
          >
            <Table
              size="small"
              sx={{
                minWidth: '100%',
                height: '100%',
                backgroundColor: 'background.secondary',
              }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    Cặp
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    Giá
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topRightRows.map((row, index) => (
                  <TableRow
                    key={`row-${index}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ padding: 0 }}
                    >
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <StarIcon
                          sx={{ fontSize: '16px', marginRight: '6px' }}
                        />

                        <Typography
                          sx={{
                            fontSize: '10px',
                            lineHeight: '24px',
                            color: 'text.primary',
                          }}
                        >
                          {row.label}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          lineHeight: '24px',
                          color: 'text.primary',
                        }}
                      >
                        {row.price}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        <Stack direction="column" flex={1} maxHeight="50%">
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              textAlign: 'center',
              margin: '10px auto',
            }}
          >
            Giao dịch của tôi
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: '20px',
              overflow: 'auto',
            }}
          >
            <Table
              size="small"
              sx={{
                minWidth: 1,
                backgroundColor: 'background.secondary',
              }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: '10px', fontWeight: 600, padding: 0 }}
                  >
                    Giá (USDT)
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: '10px', fontWeight: 600, padding: 0 }}
                  >
                    Số lượng (EDU)
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: '10px', fontWeight: 600, padding: 0 }}
                  >
                    Tổng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bottomRightRows.map((row, index) => (
                  <TableRow
                    key={`row-${index}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ padding: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          lineHeight: '24px',
                          color: row.direction === 'up' ? '#408827' : '#F21616',
                        }}
                      >
                        {row.price}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          lineHeight: '24px',
                          color: 'text.primary',
                        }}
                      >
                        {row.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          lineHeight: '24px',
                          color: 'text.primary',
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
        </Stack>
      </Stack>
    );
  };

  const renderMain = () => {
    return (
      <Container
        maxWidth="md"
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // maxHeight: 'calc(100vh - 108px)',
          overflow: 'auto',
          mx: 'auto',
        }}
      >
        <Grid container flex={1} display="flex">
          <Grid item xs={9.5} lg={9.5}>
            {_renderLeftSection()}
          </Grid>
          <Grid item xs={2.5} lg={2.5}>
            {_renderRightSection()}
          </Grid>
        </Grid>
        <Grid item xs={12} borderTop="1px solid #ccc">
          <Grid container borderBottom="1px solid #ccc">
            <Grid item xs={2} borderRight="1px solid #ccc">
              <Stack direction="row" alignItems="center" padding="10px 10px">
                <TapAndPlayIcon
                  sx={{
                    marginRight: '10px',
                    color: '#408827',
                    fontSize: '16px',
                  }}
                />
                <Typography sx={{ fontSize: '12px', color: '#408827' }}>
                  Kết nối ổn định
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={7} borderRight="1px solid #ccc">
              <Grid container padding="10px 20px">
                <Grid
                  item
                  xs={12}
                  md={4}
                  display="flex"
                  direction="row"
                  sx={{ fontSize: '11px', color: '#BBAEAE' }}
                >
                  EDUUSDT{' '}
                  <span
                    style={{
                      color: '#F03030',
                      display: 'inline-block',
                      margin: '0 2px',
                    }}
                  >
                    -1.81
                  </span>{' '}
                  1.111094
                </Grid>
                <Grid
                  item
                  md={4}
                  display="flex"
                  xs={12}
                  direction="row"
                  sx={{ fontSize: '11px', color: '#BBAEAE' }}
                >
                  EDUUSDT{' '}
                  <span
                    style={{
                      color: '#F03030',
                      display: 'inline-block',
                      margin: '0 2px',
                    }}
                  >
                    -1.81
                  </span>{' '}
                  1.111094
                </Grid>
                <Grid
                  item
                  md={4}
                  display="flex"
                  xs={12}
                  direction="row"
                  sx={{ fontSize: '11px', color: '#BBAEAE' }}
                >
                  EDUUSDT{' '}
                  <span
                    style={{
                      color: '#F03030',
                      display: 'inline-block',
                      margin: '0 2px',
                    }}
                  >
                    -1.81
                  </span>{' '}
                  1.111094
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-evenly"
                padding="10px 0"
              >
                <Stack flexDirection="row" alignItems="center">
                  <NotificationsIcon
                    sx={{
                      fontSize: '16px',
                      marginRight: '6px',
                      color: '#7D6F6F',
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
                  >
                    Thông báo
                  </Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center">
                  <MarkChatUnreadIcon
                    sx={{
                      fontSize: '16px',
                      marginRight: '6px',
                      color: '#7D6F6F',
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
                  >
                    Hỗ trợ trực tuyến
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Giao dịch" />;
};

export default Transaction;
