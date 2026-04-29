'use client';

type DraftObserver<T extends DraftRecord> = (draft: DraftWithTTL<T> | null) => void;

export type DraftRecord = object;
export type DraftWithTTL<T extends DraftRecord> = T & {
  ttl: number;
};

export class LocalStorageDraft<T extends DraftRecord> {
  private observers = new Set<DraftObserver<T>>();

  constructor(private readonly storageKey: string) {}

  read(): DraftWithTTL<T> | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const now = Date.now();
    const rawValue = window.localStorage.getItem(this.storageKey);

    if (!rawValue) {
      return null;
    }

    try {
      const parsedValue: DraftWithTTL<T> = JSON.parse(rawValue);

      if (
        !parsedValue ||
        typeof parsedValue !== 'object' ||
        !('ttl' in parsedValue) ||
        typeof parsedValue.ttl !== 'number' ||
        parsedValue.ttl <= now
      ) {
        window.localStorage.removeItem(this.storageKey);
        return null;
      }

      return parsedValue;
    } catch {
      window.localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  set(payload: T, ttlMs: number): DraftWithTTL<T> {
    const nextDraft = this._create(payload, ttlMs);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.storageKey, JSON.stringify(nextDraft));
    }
    this._notify(nextDraft);

    return nextDraft;
  }

  clear(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.storageKey);
    }
    this._notify(null);
  }

  subscribe(observer: DraftObserver<T>): () => void {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  emitCurrent(): void {
    this._notify(this.read());
  }

  private _create(payload: T, ttlMs: number): DraftWithTTL<T> {
    return {
      ...payload,
      ttl: Date.now() + ttlMs,
    };
  }

  private _notify(draft: DraftWithTTL<T> | null): void {
    this.observers.forEach((observer) => observer(draft));
  }
}
