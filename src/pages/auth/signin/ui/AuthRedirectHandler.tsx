'use client';
import { useAuthRedirectMessage } from '../model/useAuthRedirectMessage';

export function AuthRedirectHandler() {
  useAuthRedirectMessage();
  return null;
}
