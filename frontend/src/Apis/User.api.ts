import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { USERS } = API;

export const updateAvatar = async (payload: { avatar: string }) => {
  return sendRequest(USERS.UPDATE_AVATAR, 'PUT', payload);
};

export const fetchUsers = async () => {
  return sendRequest(USERS.FETCH_USERS, 'GET');
};

export const getSelf = async () => {
  return sendRequest(USERS.GET_SELF, 'GET');
};

export const updateNickname = async (payload: { nickname: string }) => {
  return sendRequest(USERS.UPDATE_NICKNAME, 'PUT', payload);
};
