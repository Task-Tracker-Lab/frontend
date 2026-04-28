import { useQuery } from '@tanstack/react-query';
import { getUserActivity } from '../services/get-user-activity';

export const currentUserActivityQueryKey = ['users/me/activity'] as const;

export function useCurrentUserActivity() {
  return useQuery({
    queryKey: currentUserActivityQueryKey,
    queryFn: ({ signal }) => getUserActivity(signal),
    staleTime: 60_000,
    refetchOnMount: false,
  });
}
