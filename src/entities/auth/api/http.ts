import { z } from 'zod/v4';
import { api } from 'shared/api';
import { SigninBody, SigninResponse } from '../model/schemas/sign-in-schema';
import { SignoutResponse } from '../model/schemas/sign-out-schema';
import { SignupBody, SignupResponse } from '../model/schemas/sign-up-schema';
import { SignupConfirmBody, SignupConfirmResponse } from '../model/schemas/sign-up-confirm-schema';
import { ResetPasswordBody, ResetPasswordResponse } from '../model/schemas/reset-password-schema';
import {
  ResetPasswordVerifyBody,
  ResetPasswordVerifyResponse,
} from '../model/schemas/reset-password-verify-schema';
import {
  ResetPasswordConfirmBody,
  ResetPasswordConfirmResponse,
} from '../model/schemas/reset-password-confirm-schema';

export class AuthHttp {
  static signin(data: z.infer<typeof SigninBody>) {
    return api<z.infer<typeof SigninResponse>>({
      url: '/auth/sign-in',
      method: 'POST',
      data: data,
      skipAuthRefresh: true,
      contracts: {
        body: SigninBody,
        response: SigninResponse,
      },
    });
  }

  static signout() {
    return api<z.infer<typeof SignoutResponse>>({
      url: '/auth/sign-out',
      method: 'POST',
      contracts: {
        response: SignoutResponse,
      },
    });
  }

  static signup(data: z.infer<typeof SignupBody>) {
    return api<z.infer<typeof SignupResponse>>({
      url: '/auth/sign-up',
      method: 'POST',
      data: data,
      contracts: {
        body: SignupBody,
        response: SignupResponse,
      },
    });
  }

  static signupConfirm(data: z.infer<typeof SignupConfirmBody>) {
    return api<z.infer<typeof SignupConfirmResponse>>({
      url: '/auth/sign-up/confirm',
      method: 'POST',
      data: data,
      skipAuthRefresh: true,
      contracts: {
        body: SignupConfirmBody,
        response: SignupConfirmResponse,
      },
    });
  }

  static resetPassword(data: z.infer<typeof ResetPasswordBody>) {
    return api<z.infer<typeof ResetPasswordResponse>>({
      url: '/auth/password/reset',
      method: 'POST',
      data: data,
      contracts: {
        body: ResetPasswordBody,
        response: ResetPasswordResponse,
      },
    });
  }

  static resetPasswordVerify(data: z.infer<typeof ResetPasswordVerifyBody>) {
    return api<z.infer<typeof ResetPasswordVerifyResponse>>({
      url: '/auth/password/reset/verify',
      method: 'POST',
      data: data,
      contracts: {
        body: ResetPasswordVerifyBody,
        response: ResetPasswordVerifyResponse,
      },
    });
  }

  static resetPasswordConfirm(data: z.infer<typeof ResetPasswordConfirmBody>) {
    return api<z.infer<typeof ResetPasswordConfirmResponse>>({
      url: '/auth/password/reset/confirm',
      method: 'POST',
      data: data,
      contracts: {
        body: ResetPasswordConfirmBody,
        response: ResetPasswordConfirmResponse,
      },
    });
  }
}
