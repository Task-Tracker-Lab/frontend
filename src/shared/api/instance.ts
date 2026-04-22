import Axios, { AxiosError } from 'axios';
import type { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import { applyInterceptors } from './interceptors';

const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

applyInterceptors(AXIOS_INSTANCE);

export const instance = <Res>(
  config: AxiosAuthRefreshRequestConfig,
  options?: AxiosAuthRefreshRequestConfig
): Promise<Res> => {
  return AXIOS_INSTANCE({ ...config, ...options }).then(({ data }) => data);
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
