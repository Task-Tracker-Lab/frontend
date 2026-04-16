import { AxiosError, AxiosInstance } from 'axios';
import { AxiosContracts } from './validation/AxiosContracts';
import { authControllerRefresh } from './endpoints/auth/auth';
import { createAuthRefresh } from 'axios-auth-refresh';
import { RefreshTokenResponseOutput } from './schemas';

export function applyInterceptors(instance: AxiosInstance) {
  const refreshAuth = (failedRequest: AxiosError): Promise<void> =>
    authControllerRefresh({
      contracts: {
        response: RefreshTokenResponseOutput,
      },
    }).then((data) => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        failedRequest.response?.config.headers.set('Authorization', `Bearer ${data.token}`);
      }
    });

  //валидация запросов
  instance.interceptors.request.use(AxiosContracts.requestContractInterceptor);
  createAuthRefresh(instance, refreshAuth);

  //валидация ответов
  instance.interceptors.response.use(AxiosContracts.responseContractInterceptor, (error) =>
    Promise.reject(error)
  );
}
