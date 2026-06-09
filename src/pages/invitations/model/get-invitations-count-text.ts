import { getPluralForm, type PluralForms } from 'shared/lib/utils';

const invitationsCountForms: PluralForms = {
  one: 'приглашение',
  few: 'приглашения',
  two: 'приглашения',
  many: 'приглашений',
  zero: 'приглашений',
  other: 'приглашений',
};

export function getInvitationsCountText(count: number) {
  return `${count} ${getPluralForm(count, invitationsCountForms)}`;
}
