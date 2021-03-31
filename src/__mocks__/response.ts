import { AxiosResponse } from 'axios';

type TCreateSuccessfulResponse = (
  data?: Record<any, any>,
) => Pick<AxiosResponse, 'status' | 'statusText' | 'data'>;

type TCreateFailedResponse = (
  status?: AxiosResponse['status'],
  data?: Record<any, any>,
) => Pick<AxiosResponse, 'status' | 'data'>;

export const createSuccessfulResponse: TCreateSuccessfulResponse = (data) => ({
  status: 200,
  statusText: 'OK',
  data,
});

export const createFailedResponse: TCreateFailedResponse = (status = 500, data) => ({
  status,
  data,
});
