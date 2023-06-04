import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AdminLayout } from '@/Components/DefaultLayout';
import React from 'react';

const users = [
  {
    id: '01',
    name: 'User 001',
    messages: [
      {
        senderId: '01',
        message: 'Hello, someone can help me?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: 'Yes, can I help you?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
            {
        senderId: '00',
        message: 'Yes, can I help you?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
            {
        senderId: '00',
        message: 'Yes, can I help you?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
    ],
  },
  {
    id: '02',
    name: 'User 002',
    messages: [
      {
        senderId: '02',
        message: 'Hello, someone can help me?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: 'Yes, can I help you?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '02',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '02',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
    ],
  },
  {
    id: '03',
    name: 'User 003',
    messages: [
      {
        senderId: '03',
        message: 'Hello, someone can help me?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: 'Yes, can I help you?',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '03',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '03',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '00',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
      {
        senderId: '01',
        message: '............',
        time: '03:05:00 13/05/2023',
      },
    ],
  },
];

const Support = () => {
  const [selectedUser, setSelectedUser] = React.useState<string>('');

  const _renderMsg = () => {
    const findUser = users.find((user: any) => user.id === selectedUser);
    const messages = findUser?.messages;
    return (
      <Stack direction="column" sx={{ height: '100%' }}>
        <Stack
          direction="column"
          flex={1}
          spacing={2}
          padding="10px"
          sx={{ maxHeight: 'calc(100vh - 121.5px)', overflow: 'auto' }}
        >
          {messages && messages.length > 0 ? (
            messages.map((item: any, index: number) => {
              const isSender = item.senderId === '00';
              return (
                <Stack
                  key={`message-${findUser.id}-${index}`}
                  direction="row"
                  justifyContent={isSender ? 'flex-end' : 'flex-start'}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      order: isSender ? 2 : 1,
                      marginRight: isSender ? 0 : 1,
                    }}
                  />
                  <Typography
                    sx={{
                      padding: '10px',
                      backgroundColor: isSender
                        ? 'background.chargeInput'
                        : 'background.mainContent',
                      borderRadius: '5px',
                      fontSize: '14px',
                      order: isSender ? 1 : 2,
                      marginRight: isSender ? 1 : 0,
                    }}
                  >
                    {item?.message}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Typography sx={{ fontSize: '14px', padding: '10px' }}>
              Không có dữ liệu về tin nhắn với người dùng này
            </Typography>
          )}
        </Stack>
        <Stack direction="row">
          <TextField
            size="small"
            fullWidth
            placeholder="Nhập tin nhắn trước khi gửi"
          />
          <Button size="small" variant="contained">
            Gửi
          </Button>
        </Stack>
      </Stack>
    );
  };

  const _renderRequiredUser = () => {
    return (
      <Typography sx={{ fontSize: '14px', padding: '10px' }}>
        Vui lòng chọn người dùng trước khi hỗ trợ
      </Typography>
    );
  };

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px', height: '100%' }} direction="column">
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Hỗ trợ trực tuyến
        </Typography>
        <Grid
          container
          height="100%"
          maxWidth="800px"
          border="1px solid #BEBEBE"
        >
          <Grid item xs={3} borderRight="1px solid #BEBEBE">
            <Stack direction="column">
              {users.map((user: any) => {
                const { messages } = user;
                const lastMsg = messages[messages.length - 1];
                const isActive = user.id === selectedUser;
                return (
                  <Stack
                    direction="row"
                    key={`user-${user.id}`}
                    padding="10px"
                    sx={{
                      color: isActive ? 'text.secondary' : 'text.primary',
                      backgroundColor: isActive
                        ? 'background.primary'
                        : 'background.default',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor: isActive
                          ? 'background.primary'
                          : 'background.lightSilver',
                        color: 'text.secondary',
                      },
                    }}
                    onClick={() => setSelectedUser(user.id)}
                  >
                    <Avatar
                      sx={{
                        width: '40px',
                        height: '40px',
                        marginRight: '10px',
                      }}
                    />
                    <Stack direction="column">
                      <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
                        {user.name}
                      </Typography>
                      <Typography sx={{ fontSize: '13px' }}>
                        {lastMsg?.senderId !== '00' ? '' : 'You: '}
                        {lastMsg ? lastMsg.message : ''}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={9}>
            {selectedUser ? _renderMsg() : _renderRequiredUser()}
          </Grid>
        </Grid>
      </Stack>
    );
  };
  return (
    <AdminLayout content={_renderMain()} screenTitle="Thông tin ngân hàng" />
  );
};

export default Support;
