import { Plus } from 'lucide-react';
import { Button } from 'shared/ui';
import { useActiveFieldStore } from '../model/useActiveFieldStore';

export function CreateTaskButton({ id }: { id: string }) {
  const open = useActiveFieldStore((s) => s.open);
  return (
    <Button onClick={() => open(id)} size={'icon-sm'} variant={'ghost'}>
      <Plus />
    </Button>
  );
}
