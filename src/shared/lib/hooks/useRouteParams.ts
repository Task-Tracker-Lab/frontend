'use client';

import { useParams } from 'next/navigation';

export type RouteParams = {
  projectSlug: string;
  boardSlug: string;
  teamId: string;
};

export function useRouteParams(): RouteParams {
  const params = useParams<Partial<RouteParams>>();

  return {
    projectSlug: params?.projectSlug ?? '',
    boardSlug: params?.boardSlug ?? '',
    teamId: params?.teamId ?? '',
  };
}
