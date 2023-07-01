import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { BONUS } = API;

export const getAllBonus = async () => {
  return sendRequest(BONUS.BASIC, 'GET');
};

export const updateBonus = async (id: string, payload: any) => {
  return sendRequest(`${BONUS.BASIC}/${id}`, 'PUT', payload);
};
