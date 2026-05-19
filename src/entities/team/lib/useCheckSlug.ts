import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { debounce } from 'shared/lib/utils';
import { TeamQueries } from '../api/queries';
import { MAX_SLUG_LENGTH, MIN_SLUG_LENGTH, teamFabricKeys } from '../model/const';

const DEBOUNCE_MS = 400;
const SLUG_UNAVAILABLE_MESSAGE = 'Этот адрес уже занят';

export type CheckSlugErrors = FieldErrors<{ slug: string }>;

function prepareResponse(available: boolean, message?: string): CheckSlugErrors {
  if (available) {
    return {};
  }

  return {
    slug: {
      type: 'validate',
      message: message ?? SLUG_UNAVAILABLE_MESSAGE,
    },
  };
}

export function useCheckSlug(defaultValue: string) {
  const currentSlug = useRef(defaultValue);
  const pendingResolve = useRef<((errors: CheckSlugErrors) => void) | null>(null);
  const queryClient = useQueryClient();

  const resolvePending = useCallback((errors: CheckSlugErrors) => {
    pendingResolve.current?.(errors);
    pendingResolve.current = null;
  }, []);

  const debouncedCheckSlug = useMemo(() => {
    // eslint-disable-next-line react-hooks/refs -- refs read only in async-callback debounce
    return debounce(async (value: string) => {
      try {
        const data = await queryClient.fetchQuery(TeamQueries.checkSlug(value));

        // when the server response arrives but is already outdated
        if (value !== currentSlug.current) {
          return;
        }

        resolvePending(prepareResponse(data.available, data.message));
      } catch {
        if (value === currentSlug.current) {
          resolvePending({});
        }
      }
    }, DEBOUNCE_MS);
  }, [queryClient, resolvePending]);

  const cancel = useCallback(() => {
    debouncedCheckSlug.cancelDebouncedCallback();
    queryClient.cancelQueries({ queryKey: teamFabricKeys.checkSlug() });
    resolvePending({});
  }, [debouncedCheckSlug, queryClient, resolvePending]);

  useEffect(() => {
    return () => {
      cancel();
      queryClient.removeQueries({ queryKey: teamFabricKeys.checkSlug() });
    };
  }, [cancel, queryClient]);

  return useCallback(
    (value: string): Promise<CheckSlugErrors> =>
      new Promise((resolve) => {
        const isValid =
          defaultValue !== value &&
          value.length >= MIN_SLUG_LENGTH &&
          value.length <= MAX_SLUG_LENGTH;

        cancel();
        currentSlug.current = value;

        if (!isValid) {
          resolve({});
          return;
        }

        pendingResolve.current = resolve;
        debouncedCheckSlug.debouncedCallback(value);
      }),
    [cancel, debouncedCheckSlug, defaultValue]
  );
}
