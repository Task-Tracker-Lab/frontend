import { z } from 'zod/v4';
import * as SAuth from './schemas';

export type Email = z.infer<typeof SAuth.Email>;
export type Password = z.infer<typeof SAuth.Password>;
export type OTPCode = z.infer<typeof SAuth.OTPCode>;
export type OAuthProvider = z.infer<typeof SAuth.OAuthProvider>;

export type SigninBody = z.infer<typeof SAuth.SigninBody>;
export type SigninResponse = z.infer<typeof SAuth.SigninResponse>;
export type SignoutResponse = z.infer<typeof SAuth.SignoutResponse>;

export type SignupBody = z.infer<typeof SAuth.SignupBody>;
export type SignupResponse = z.infer<typeof SAuth.SignupResponse>;
export type SignupConfirmBody = z.infer<typeof SAuth.SignupConfirmBody>;
export type SignupConfirmResponse = z.infer<typeof SAuth.SignupConfirmResponse>;

export type ResetPasswordBody = z.infer<typeof SAuth.ResetPasswordBody>;
export type ResetPasswordResponse = z.infer<typeof SAuth.ResetPasswordResponse>;
export type ResetPasswordVerifyBody = z.infer<typeof SAuth.ResetPasswordVerifyBody>;
export type ResetPasswordVerifyResponse = z.infer<typeof SAuth.ResetPasswordVerifyResponse>;
export type ResetPasswordConfirmBody = z.infer<typeof SAuth.ResetPasswordConfirmBody>;
export type ResetPasswordConfirmResponse = z.infer<typeof SAuth.ResetPasswordConfirmResponse>;

export type OAuthProvidersResponse = z.infer<typeof SAuth.OAuthProvidersResponse>;
export type ConnectedOAuthProvidersResponse = z.infer<typeof SAuth.ConnectedOAuthProvidersResponse>;
export type ConnectOAuthProviderResponse = z.infer<typeof SAuth.ConnectOAuthProviderResponse>;
export type RemoveOAuthProviderResponse = z.infer<typeof SAuth.RemoveOAuthProviderResponse>;
