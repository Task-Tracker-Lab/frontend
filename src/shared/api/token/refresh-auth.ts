import { AxiosError, AxiosInstance } from 'axios';
import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import { z } from 'zod';
import { RefreshTokenResponse } from './ResponseSchema';
import { accessToken } from './access-token';

export const refreshAuth =
  (instance: AxiosInstance) =>
  (failedRequest: AxiosError): Promise<void> =>
    instance<z.infer<typeof RefreshTokenResponse>>({
      url: `/auth/refresh`,
      method: 'POST',
      skipAuthRefresh: true,
      contracts: {
        response: RefreshTokenResponse,
      },
    } as AxiosAuthRefreshRequestConfig).then(({ data }) => {
      if (data.success) {
        accessToken.token = data.token;
        failedRequest.response?.config.headers.set('Authorization', accessToken.header);
      }
    });
