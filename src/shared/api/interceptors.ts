import { AxiosInstance } from 'axios';
import { AccessToken, refreshInterceptor } from './token';
import { AxiosContracts } from './validation';

export function applyInterceptors(instance: AxiosInstance) {
  //установка актуального токена доступа
  instance.interceptors.request.use((config) => {
    if (AccessToken.header) {
      config.headers.set('Authorization', AccessToken.header);
    }
    return config;
  });
  //валидация запросов
  instance.interceptors.request.use(AxiosContracts.requestContractInterceptor);

  //обновление токена доступа
  refreshInterceptor(instance);

  //валидация ответов
  instance.interceptors.response.use(AxiosContracts.responseContractInterceptor);
}
