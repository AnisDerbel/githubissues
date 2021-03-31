import { AxiosInstance, AxiosError } from 'axios';
import { alertRef } from '../../components/CustomDropdownAlert';

const errorInterceptor = async (error: AxiosError) => {
  if (error.response?.status === 404)
    showErrorAlert('Not found', 'Organization and/or repository not found!');
  else showErrorAlert('Oops', 'Something went wrong');

  return Promise.reject(error);
};

export const interceptors = (client: AxiosInstance) => {
  client.interceptors.response.use((res) => res, errorInterceptor);

  return client;
};

export function showErrorAlert(title: string, message: string) {
  const { current: alert } = alertRef;

  if (!alert) {
    return;
  }

  return alert.alertWithType('error', title, message);
}
