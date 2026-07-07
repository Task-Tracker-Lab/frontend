import { getPluralForm, type PluralForms } from 'shared/lib/utils';

const pendingMembersCountForms: PluralForms = {
  one: 'участника',
  few: 'участника',
  two: 'участника',
  many: 'участников',
  zero: 'участников',
  other: 'участников',
};

export function getPendingMembersCountText(count: number) {
  return `${count} ${getPluralForm(count, pendingMembersCountForms)}`;
}
