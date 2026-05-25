import { toast } from 'sonner';

export async function copyShareUrl(shareUrl: string | null) {
  if (!shareUrl) {
    return;
  }

  try {
    await navigator.clipboard.writeText(shareUrl);
    toast.success('Ссылка скопирована');
  } catch {
    toast.error('Не удалось скопировать ссылку');
  }
}
