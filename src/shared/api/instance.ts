import Axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { createAuthRefresh } from 'axios-auth-refresh';
import { authControllerRefresh } from 'shared/api';

const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

type TokenRefreshResponse = {
  success?: true;
  token: string;
};

const refreshAuth = (failedRequest: AxiosError): Promise<void> =>
  authControllerRefresh().then((tokenRefreshResponse) => {
    //todo пофиксить когда на бэке будет схема
    const response = tokenRefreshResponse as AxiosResponse<TokenRefreshResponse>;

    if (response.data?.success) {
      const token = response.data.token;

      localStorage.setItem('token', token);

      failedRequest.response?.config.headers.set('Authorization', 'Bearer ' + token);

      return Promise.resolve();
    }
  });

createAuthRefresh(AXIOS_INSTANCE, refreshAuth);

export const instance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return AXIOS_INSTANCE({ ...config, ...options }).then(({ data }) => data);
};
//todo ошибки

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
