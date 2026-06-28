import { useParams } from 'next/navigation';

type BoardRouteParams = {
  projectSlug: string;
  boardSlug: string;
};

export function useBoardParams(): BoardRouteParams {
  const params = useParams<BoardRouteParams>();

  return {
    projectSlug: params?.projectSlug ?? '',
    boardSlug: params?.boardSlug ?? '',
  };
}
