import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Label,
  RadioGroup,
  RadioGroupItem,
} from 'shared/ui';

const roleOptions = [
  { value: 'Admin', desc: 'Полный доступ' },
  { value: 'Product', desc: 'Управление проектами' },
  { value: 'Engineer', desc: 'Разработка функций' },
  { value: 'Designer', desc: 'Дизайн функций' },
  { value: 'Marketing', desc: 'Ведение кампаний' },
] as const;

export function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [role, setRole] = useState<string>('Engineer');
  const [email, setEmail] = useState('');

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="max-w-md px-0">
        <DialogHeader className="border-b px-5 pb-3">
          <DialogTitle>Пригласить участника</DialogTitle>
          <DialogDescription className="text-xs">
            Участнику будет отправлена безопасная ссылка для входа в рабочее пространство.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 px-5">
          <div className="space-y-1.5">
            <Label htmlFor="invite-email">Email адрес</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>
                  <Mail size={14} />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="invite-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                type="email"
              />
            </InputGroup>
          </div>

          <div className="space-y-1.5">
            <Label>Назначить роль</Label>
            <RadioGroup value={role} onValueChange={setRole}>
              {roleOptions.map(({ value, desc }) => (
                <FieldLabel htmlFor={value} key={value}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{value}</FieldTitle>
                      <FieldDescription>{desc}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={value} id={value} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="mx-0 px-5">
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button>
            <Send size={13} /> Отправить приглашение
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
