import { AxiosInstance } from 'axios';
import { createAuthRefresh } from 'axios-auth-refresh';
import { accessToken, refreshAuth } from './token';
import { AxiosContracts } from 'shared/api/validation';

export function applyInterceptors(instance: AxiosInstance) {
  //установка актуального токена доступа
  instance.interceptors.request.use((config) => {
    if (accessToken.header) {
      config.headers.set('Authorization', accessToken.header);
    }
    return config;
  });
  //валидация запросов
  instance.interceptors.request.use(AxiosContracts.requestContractInterceptor);

  //обновление токена доступа
  createAuthRefresh(instance, refreshAuth(instance), { maxRetries: 1 });

  //валидация ответов
  instance.interceptors.response.use(AxiosContracts.responseContractInterceptor);
}
