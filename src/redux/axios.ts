import axios from 'axios';
import { interceptors } from './interceptors/interceptors';
export const BASE_URL = 'https://api.github.com';

export const createAxiosInstance = () =>
  axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    validateStatus: (status: number) => status >= 200 && status < 400,
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

export default interceptors(createAxiosInstance());
