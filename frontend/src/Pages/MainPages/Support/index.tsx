import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
  Divider,
  Avatar,
} from '@mui/material';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Utils } from '@/Libs';
import { ChatBoxActions } from '@/Reducers/Actions';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { ROUTERS } from '../../../Constants';

const { fetchChatBox } = ChatBoxActions;

const Support: React.FC = () => {
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();
  const payload: any[] = useSelector((state: RootState) =>
    _.get(state.CHAT_BOX, 'payload')
  );
  const [currentRoom, setCurrentRoom] = React.useState<any>({
    roomId: '',
    receiverId: '',
  });
  const [, setCurrentPayload] = React.useState<any>([]);
  const valueRef = React.useRef<any>([]);
  const [message, setMessage] = React.useState<string>('');
  const messageBoxRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageBoxRef && messageBoxRef.current) {
        messageBoxRef.current.scrollTo({
          top: messageBoxRef.current.scrollHeight,
          behavior: 'auto',
        });
      }
    }, 100);
  };

  React.useEffect(() => {
    if (userData?.role === 'admin') Utils.redirect(ROUTERS.OVERVIEW)
  }, [])

  React.useEffect(() => {
    dispatch(fetchChatBox());
    Utils.WebSocket.on('receiveMessage', (data: any) => {
      setMessage('');
      if (data.id) setCurrentRoom({ roomId: data.id, ...data });
      scrollToBottom();
      const resolvePayload = valueRef.current.map((item: any) => {
        if (item.id === data.id) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });
      valueRef.current = resolvePayload;
    });
  }, []);

  React.useEffect(() => {
    if (payload.length > 0) {
      valueRef.current = payload;
      setCurrentPayload(payload);
    }
  }, [payload]);

  const onSendMessage = () => {
    Utils.WebSocket.emit(
      'sendMessage',
      {
        userId: userData.id,
        roomId: currentRoom.roomId,
        receiverId: currentRoom.receiverId,
        message,
      },
      () => {
        setMessage('');
      }
    );
  };

  const findUser = (userId: string) => {
    const { receiverId, senderId } = currentRoom;
    if (userId === receiverId?.id) return receiverId;
    return senderId;
  };

  const adminOptions = () => {
    const result: any[] = [];
    if (valueRef.current.length > 0) {
      valueRef.current.forEach((item: any) => {
        const { receiverId, messages } = item;
        const lastMessage = messages[messages.length - 1];
        const isActive = currentRoom?.roomId === item.id;
        result.push(
          <Stack
            direction="row"
            key={`user-${receiverId.id}`}
            sx={{
              padding: '10px',
              background: isActive ? 'rgba(0,0,0,0.2)' : 'transparent',
              ':hover': {
                background: 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              setCurrentRoom({ ...item, roomId: item.id });
              scrollToBottom();

              Utils.WebSocket.emit(
                'joinRoom',
                { userId: userData.id, roomId: item.id },
                (data: any) => {
                  console.log(data?.message);
                }
              );
            }}
          >
            <Avatar src={receiverId.avatar} sx={{ marginRight: '10px' }} />
            <Stack direction="column">
              <Typography sx={{ fontSize: '15px', fontWeight: 500 }}>
                {receiverId.nickname}
              </Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
                {lastMessage ? lastMessage.message : '<Trống>'}
              </Typography>
            </Stack>
          </Stack>
        );
      });
    }
    return result;
  };

  const _renderEmptyRoom = () => {
    return (
      <Typography sx={{ padding: '24px 30px', fontSize: '14px' }}>
        Vui lòng chọn admin!
      </Typography>
    );
  };

  const _renderMessageBox = () => {
    return (
      <Stack
        direction="column"
        sx={{
          width: '100%',
          padding: '20px 30px',
          height: '100%',
        }}
      >
        <Box
          sx={{
            padding: '0px 10px 16px 10px',
            maxHeight: '350px',
            overflow: 'auto',
            flex: 1,
          }}
          ref={messageBoxRef}
        >
          {currentRoom?.messages.length > 0 &&
            currentRoom?.messages?.map((item: any) => {
              return (
                <Stack
                  direction="column"
                  key={`message-${item.id}`}
                  marginBottom="16px"
                >
                  <Stack direction="row" alignItems="center">
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                      {findUser(item.senderId)?.nickname}{' '}
                      {item.senderId === userData.id ? '(You)' : ''}
                    </Typography>
                    <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      marginLeft: '20px',
                      marginTop: '5px',
                    }}
                  >
                    {item.message}
                  </Typography>
                </Stack>
              );
            })}
          {currentRoom?.messages.length === 0 && (
            <Typography sx={{ fontSize: '14px' }}>
              Không có dữ liệu tin nhắn!
            </Typography>
          )}
        </Box>
        <TextField
          rows={2}
          multiline
          placeholder="Điền nội dung tin nhắn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            marginTop: '10px',
            background: '#ffffff',
            borderColor: '#000000',
            fontSize: '12px',
            ' *': {
              color: '#000000',
              fontSize: '12px',
            },
          }}
        />
        <Button
          sx={{
            backgroundColor: 'background.burntSienna',
            color: 'text.secondary',
            textTransform: 'unset',
            height: '30px',
            width: '144px',
            fontWeight: 600,
            fontSize: '14px',
            marginTop: '10px',
            alignSelf: 'flex-end',
          }}
          onClick={() => onSendMessage()}
          disabled={!Boolean(message.trim()) || !Boolean(currentRoom?.roomId)}
        >
          Gửi
        </Button>
      </Stack>
    );
  };

  // Constructors
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
            <Stack direction="column" padding={{ xs: '10px', md: 0 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  fontWeight: 600,
                }}
              >
                CSKH trực tuyến
              </Typography>
              <Stack direction="column" marginTop="30px">
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    backgroundColor: 'background.burntSienna',
                    padding: '10px',
                  }}
                >
                  <AccountBoxIcon
                    sx={{ color: '#545454', marginRight: '10px' }}
                  />
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '20px',
                      fontWeight: 400,
                    }}
                  >
                    Admin
                  </Typography>
                </Stack>
              </Stack>
              <Grid
                container
                sx={{
                  backgroundColor: 'background.mainContent',
                  minHeight: '250px',
                }}
              >
                <Grid item xs={3} sx={{ borderRight: '1px solid #ccc' }}>
                  <Stack direction="column" sx={{ padding: '16px 0' }}>
                    {adminOptions()}
                  </Stack>
                </Grid>
                <Grid item xs={9}>
                  {currentRoom.roomId
                    ? _renderMessageBox()
                    : _renderEmptyRoom()}
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="CSKH trực tuyến" />;
};

export default Support;
