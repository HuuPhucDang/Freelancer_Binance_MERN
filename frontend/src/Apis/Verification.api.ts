import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { VERIFICATION } = API;

export const uploadCardsId = async (payload: FormData) => {
  return sendRequest(VERIFICATION.UPLOAD_CARDS_ID, 'FORM_DATA', payload);
};
