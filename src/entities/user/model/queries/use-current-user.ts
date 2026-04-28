import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/get-user';

export const currentUserQueryKey = ['users/me'] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: ({ signal }) => getUser(signal),
    staleTime: 60_000,
    refetchOnMount: false,
  });
}
