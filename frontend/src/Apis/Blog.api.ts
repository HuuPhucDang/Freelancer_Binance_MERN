import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
const { BLOG } = API;

export const fetchBlogList = async (payload: {
  skipCount?: number;
  maxResultCount: number;
  catId?: number;
  authorId?: number;
  isFeatured?: boolean;
}) => {
  return sendRequest(BLOG.GET_LIST, 'GET', payload);
};

export const getBlogById = async (id: string) => {
  return sendRequest(`${BLOG.GET_BY_ID}`, 'GET', { id });
};

export const fetchBlogSection = async () => {
  return sendRequest(BLOG.GET_SECTION, 'GET');
};
