import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { CHAT_BOX } = API;

export const fetchChatBox = async (payload: any) => {
  return sendRequest(CHAT_BOX.BASIC, 'GET', payload);
};

export const fetchChatBoxById = async (id: string) => {
  return sendRequest(`${CHAT_BOX.BASIC}/${id}`, 'GET');
};
