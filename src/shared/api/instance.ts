import Axios, { AxiosRequestConfig } from 'axios';
import { applyInterceptors } from './interceptors';

const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

applyInterceptors(AXIOS_INSTANCE);

export const instance = <Res>(config: AxiosRequestConfig): Promise<Res> => {
  return AXIOS_INSTANCE(config).then(({ data }) => data);
};
