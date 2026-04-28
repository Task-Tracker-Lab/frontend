import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { z } from 'zod/v4';
import { RefreshTokenResponse } from './response-schema';
import { AccessToken } from './access-token';
import { GlobalErrorSchema } from '../schemas';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

type RetryRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };
type QueuePromise = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export const refreshInterceptor = (instance: AxiosInstance) => {
  let isRefreshing = false;
  let failedQueue: QueuePromise[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token ?? '');
      }
    });
    failedQueue = [];
  };

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<z.infer<typeof GlobalErrorSchema>>) => {
      const originalRequest = error.config as RetryRequestConfig;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !error.response.config.skipAuthRefresh
      ) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest._retry = true;
              originalRequest.headers.set('Authorization', AccessToken.getHeader(token));
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await instance.request<z.infer<typeof RefreshTokenResponse>>({
            url: `/auth/refresh`,
            method: 'POST',
            contracts: {
              response: RefreshTokenResponse,
            },
            skipAuthRefresh: true,
          });

          if (!response.data.success) {
            return Promise.reject(
              new AxiosError(
                response.data.message ?? 'Ошибка обновления токена.',
                undefined,
                response.config,
                response.request,
                response
              )
            );
          }

          AccessToken.token = response.data.token;
          originalRequest.headers.set('Authorization', AccessToken.header);
          processQueue(null, response.data.token);
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          AccessToken.clear();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
