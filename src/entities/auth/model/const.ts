import { createEntityKeys } from 'shared/lib/utils';

export const MIN_PASS_LENGTH = 8;
export const MAX_PASS_LENGTH = 32;
export const OTP_LENGTH = 6;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const authFabricKeys = createEntityKeys('auth', {
  availableProviders: () => ['providers', 'available'],
  connectedProviders: () => ['providers', 'connected'],
});
