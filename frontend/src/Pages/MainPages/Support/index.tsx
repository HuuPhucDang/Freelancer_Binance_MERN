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
} from '@mui/material';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Utils } from '@/Libs';
import { ChatBoxActions } from '@/Reducers/Actions';
import { RootState, useTypedDispatch } from '@/Reducers/store';

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
    dispatch(fetchChatBox());
    Utils.WebSocket.on('receiveMessage', (data: any) => {
      setMessage('');
      setCurrentRoom({ roomId: data.id, ...data });
      scrollToBottom();
    });
  }, []);

  React.useEffect(() => {
    if (payload.length > 0) {
      const findRoom = payload.find(
        (item: { senderId: { id: string } }) => item.senderId.id === userData.id
      );
      if (findRoom) {
        setCurrentRoom({ roomId: findRoom.id, ...findRoom });
        scrollToBottom();

        Utils.WebSocket.emit(
          'joinRoom',
          { userId: userData.id, roomId: findRoom.id },
          (data: any) => {
            console.log(data?.message);
          }
        );
      }
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
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
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
              <Stack
                direction="column"
                sx={{
                  width: '100%',
                  backgroundColor: 'background.mainContent',
                  padding: '20px 60px',
                }}
              >
                <Box
                  sx={{
                    padding: '0px 10px 16px 10px',
                    maxHeight: '350px',
                    overflow: 'auto',
                  }}
                  ref={messageBoxRef}
                >
                  {currentRoom?.messages?.map((item: any) => {
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
                  disabled={!Boolean(message.trim())}
                >
                  Gửi
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="CSKH trực tuyến" />;
};

export default Support;
