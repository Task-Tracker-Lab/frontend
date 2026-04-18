'use client';

import { api } from 'shared/api';
import { useQuery } from '@tanstack/react-query';

interface ProfilePageProps {
  className?: string;
}

const getUser = () =>
  api({
    url: '/users/me',
    method: 'GET',
  });

function ProfilePage({ className }: ProfilePageProps) {
  const query = useQuery({ queryKey: ['user'], queryFn: getUser });

  return (
    <div className={className}>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
}

export { ProfilePage };
