import { api } from 'shared/api';
import * as SAuth from '../model/schemas';
import * as TAuth from '../model/types';

export class AuthHttp {
  static signin(data: TAuth.SigninBody) {
    return api<TAuth.SigninResponse>({
      url: '/auth/sign-in',
      method: 'POST',
      data: data,
      skipAuthRefresh: true,
      contracts: {
        body: SAuth.SigninBody,
        response: SAuth.SigninResponse,
      },
    });
  }

  static signout() {
    return api<TAuth.SignoutResponse>({
      url: '/auth/sign-out',
      method: 'POST',
      contracts: {
        response: SAuth.SignoutResponse,
      },
    });
  }

  static signup(data: TAuth.SignupBody) {
    return api<TAuth.SignupResponse>({
      url: '/auth/sign-up',
      method: 'POST',
      data: data,
      contracts: {
        body: SAuth.SignupBody,
        response: SAuth.SignupResponse,
      },
    });
  }

  static signupConfirm(data: TAuth.SignupConfirmBody) {
    return api<TAuth.SignupConfirmResponse>({
      url: '/auth/sign-up/confirm',
      method: 'POST',
      data: data,
      skipAuthRefresh: true,
      contracts: {
        body: SAuth.SignupConfirmBody,
        response: SAuth.SignupConfirmResponse,
      },
    });
  }

  static resetPassword(data: TAuth.ResetPasswordBody) {
    return api<TAuth.ResetPasswordResponse>({
      url: '/auth/password/reset',
      method: 'POST',
      data: data,
      contracts: {
        body: SAuth.ResetPasswordBody,
        response: SAuth.ResetPasswordResponse,
      },
    });
  }

  static resetPasswordVerify(data: TAuth.ResetPasswordVerifyBody) {
    return api<TAuth.ResetPasswordVerifyResponse>({
      url: '/auth/password/reset/verify',
      method: 'POST',
      data: data,
      contracts: {
        body: SAuth.ResetPasswordVerifyBody,
        response: SAuth.ResetPasswordVerifyResponse,
      },
    });
  }

  static resetPasswordConfirm(data: TAuth.ResetPasswordConfirmBody) {
    return api<TAuth.ResetPasswordConfirmResponse>({
      url: '/auth/password/reset/confirm',
      method: 'POST',
      data: data,
      contracts: {
        body: SAuth.ResetPasswordConfirmBody,
        response: SAuth.ResetPasswordConfirmResponse,
      },
    });
  }
  static oAuthProviders() {
    return api<TAuth.OAuthProvidersResponse>({
      url: '/auth/oauth/providers',
      method: 'GET',
      contracts: {
        response: SAuth.OAuthProvidersResponse,
      },
    });
  }
  static connectedOAuthProviders() {
    return api<TAuth.ConnectedOAuthProvidersResponse>({
      url: '/auth/oauth/providers/connected',
      method: 'GET',
      contracts: {
        response: SAuth.ConnectedOAuthProvidersResponse,
      },
    });
  }
  static connecteOAuthProvder(provider: TAuth.OAuthProvider) {
    return api<TAuth.ConnectOAuthProviderResponse>({
      url: `/auth/oauth/${provider}/connect`,
      method: 'POST',
      contracts: {
        response: SAuth.ConnectOAuthProviderResponse,
      },
    });
  }
  static removeOAuthProvder(provider: TAuth.OAuthProvider) {
    return api<TAuth.RemoveOAuthProviderResponse>({
      url: `/auth/oauth/${provider}/connect`,
      method: 'DELETE',
      contracts: {
        response: SAuth.RemoveOAuthProviderResponse,
      },
    });
  }
  static resendCode(data: TAuth.ResendCodeBody): Promise<TAuth.ResendCodeResponse> {
    return api<TAuth.ResendCodeResponse>({
      url: '/auth/resend',
      method: 'POST',
      data: data,
      contracts: {
        body: SAuth.ResendCodeBody,
        response: SAuth.ResendCodeResponse,
      },
    });
  }
}
