'use client';

import { useEffect, useState } from 'react';
import { invites } from '../model/mock';
import { InviteCard } from './components/InviteCard';
import { InviteCardSkeleton } from './components/InviteCard.skeleton';

export function Invites() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <InviteCardSkeleton key={i} />)
        : invites.map((inv) => <InviteCard key={inv.code} inv={inv} />)}
    </div>
  );
}
