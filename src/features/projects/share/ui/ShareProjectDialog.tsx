'use client';

import { buildProjectShareUrl } from 'entities/project';
import { Copy } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { useControllableState } from 'shared/lib/hooks';
import { formatDate } from 'shared/lib/utils';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from 'shared/ui';
import { SHARE_TTL_OPTIONS } from '../config/ttl-options';
import { copyShareUrl } from '../model/copy-share-url';
import { ttlOptionToBody } from '../model/ttl-option-to-body';
import type { ShareTtlOption } from '../model/types';
import { useShareProject } from '../model/useShareProject';

interface ShareProjectDialogProps extends ComponentProps<typeof DialogTrigger> {
  projectName: string;
  teamId: string;
  projectId: string;
  dialog?: ComponentProps<typeof Dialog>;
}

export function ShareProjectDialog({
  projectName,
  teamId,
  projectId,
  dialog = {},
  ...props
}: ShareProjectDialogProps) {
  const [open, setOpen] = useControllableState({
    defaultValue: dialog.defaultOpen,
    value: dialog.open,
    onChange: dialog.onOpenChange,
  });

  const [ttlOption, setTtlOption] = useState<ShareTtlOption>('90');
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const shareProject = useShareProject({
    onSuccess: (res) => {
      setShareUrl(buildProjectShareUrl(projectId, res.payload.token));
      setExpiresAt(res.payload.expiresAt);
    },
  });

  const resetState = () => {
    setTtlOption('90');
    setShareUrl(null);
    setExpiresAt(null);
    shareProject.reset();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetState();
    }
  };

  const onCreateLink = () => {
    shareProject.mutate({
      teamId,
      id: projectId,
      body: ttlOptionToBody(ttlOption),
    });
  };

  return (
    <Dialog {...dialog} open={open} onOpenChange={handleOpenChange}>
      {props.children ? <DialogTrigger {...props} /> : null}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Поделиться проектом</DialogTitle>
          <DialogDescription>
            Создайте ссылку для доступа к проекту «{projectName}» без участия в команде.
          </DialogDescription>
        </DialogHeader>

        {shareUrl ? (
          <Field>
            <FieldLabel htmlFor="share-url">Ссылка для доступа</FieldLabel>
            <InputGroup>
              <InputGroupInput id="share-url" readOnly value={shareUrl} />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Скопировать ссылку"
                  onClick={() => copyShareUrl(shareUrl)}
                >
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              {expiresAt
                ? `Ссылка действует до ${formatDate(expiresAt)}.`
                : 'Ссылка без срока действия.'}{' '}
              Отправьте её тем, кому нужен доступ к проекту.
            </FieldDescription>
          </Field>
        ) : (
          <Field>
            <FieldLabel htmlFor="share-ttl">Срок действия ссылки</FieldLabel>
            <Select
              value={ttlOption}
              onValueChange={(value) => setTtlOption(value as ShareTtlOption)}
              disabled={shareProject.isPending}
            >
              <SelectTrigger id="share-ttl" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHARE_TTL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={shareProject.isPending}>
              Закрыть
            </Button>
          </DialogClose>
          {shareUrl ? (
            <Button type="button" onClick={() => copyShareUrl(shareUrl)}>
              <Copy size={15} />
              Скопировать
            </Button>
          ) : (
            <Button type="button" onClick={onCreateLink} disabled={shareProject.isPending}>
              {shareProject.isPending ? <Spinner /> : null}
              Создать ссылку
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
