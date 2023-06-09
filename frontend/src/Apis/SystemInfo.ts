import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { SYSTEM_INFO } = API;

export const getSystemInfo = async (payload: any) => {
  return sendRequest(SYSTEM_INFO.BASIC, 'GET', payload);
};

export const updateSystemInfo = async (id: string, payload: FormData) => {
  return sendRequest(`${SYSTEM_INFO.BASIC}/${id}`, 'FORM_DATA', payload);
};
