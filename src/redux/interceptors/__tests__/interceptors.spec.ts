import 'jest';
import axios, { createAxiosInstance } from '../../axios';
import { interceptors, showErrorAlert } from '../interceptors';

describe('Interceptors', () => {
  describe('NotFoundResponseInterceptor', () => {
    beforeEach(() => {
      interceptors(createAxiosInstance());
    });

    it('should show not found message if response status is 404', () => {
      const res = {
        response: { status: 404 },
      };
      const rejectedRes = (axios.interceptors.response as any).handlers[0].rejected(res);
      expect(rejectedRes)
        .rejects.toMatchObject(res)
        .finally(() => {
          expect(showErrorAlert).toHaveBeenCalledWith(
            'Not found',
            'Organization and/or repository not found!',
          );
        });
    });
    it('should show something went wrong message if response status is 500', () => {
      const res = {
        response: { status: 500 },
      };
      const rejectedRes = (axios.interceptors.response as any).handlers[0].rejected(res);
      expect(rejectedRes)
        .rejects.toMatchObject(res)
        .finally(() => {
          expect(showErrorAlert).toHaveBeenCalledWith('Oops', 'Something went wrong');
        });
    });
  });
});
