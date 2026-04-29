'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DraftRecord, DraftWithTTL, LocalStorageDraft } from '../classes';

interface UseLocalStorageDraftOptions<T extends DraftRecord> {
  defaultTTLms?: number;
  defaultValues?: T;
}

interface UseLocalStorageDraftReturn<T extends DraftRecord> {
  draft: DraftWithTTL<T> | null;
  setDraft: (payload: T, ttlMs?: number) => void;
  clearDraft: () => void;
  draftStorage: LocalStorageDraft<T>;
}

export function useLocalStorageDraft<T extends DraftRecord>(
  storageKey: string,
  options: UseLocalStorageDraftOptions<T> = {}
): UseLocalStorageDraftReturn<T> {
  const defaultTTLms = options.defaultTTLms ?? 15 * 60 * 1000;
  const defaultValues = options.defaultValues ?? null;
  const draftStorage = useMemo(() => new LocalStorageDraft<T>(storageKey), [storageKey]);

  const [draft, setDraft] = useState<DraftWithTTL<T> | null>(null);

  useEffect(() => {
    if (defaultValues && !draftStorage.read()) {
      draftStorage.set(defaultValues, defaultTTLms);
    }

    const unsubscribe = draftStorage.subscribe((nextDraft) => {
      setDraft(nextDraft);
    });
    draftStorage.emitCurrent();

    return unsubscribe;
  }, [draftStorage]);

  const setDraftWithTTL = useCallback(
    (payload: T, ttlMs = defaultTTLms) => {
      draftStorage.set(payload, ttlMs);
    },
    [defaultTTLms, draftStorage]
  );

  const clearDraft = useCallback(() => {
    draftStorage.clear();
  }, [draftStorage]);

  return {
    draft,
    setDraft: setDraftWithTTL,
    clearDraft,
    draftStorage,
  };
}

export type { DraftWithTTL };
