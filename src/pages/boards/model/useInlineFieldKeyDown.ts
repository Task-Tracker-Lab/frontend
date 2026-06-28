import { KeyboardEvent, useCallback } from 'react';

type UseInlineFieldKeyDownOptions = {
  onCancel: () => void;
  onSubmit: () => void | Promise<void>;
};

export function useInlineFieldKeyDown({ onCancel, onSubmit }: UseInlineFieldKeyDownOptions) {
  return useCallback(
    async (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        await onSubmit();
        return;
      }

      if (event.key === ' ' && !event.shiftKey) {
        event.stopPropagation();
      }
    },
    [onCancel, onSubmit]
  );
}
