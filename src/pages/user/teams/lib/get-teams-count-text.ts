import { getPluralForm, type PluralForms } from 'shared/lib/utils';

const teamsCountForms: PluralForms = {
  one: 'команде',
  few: 'командах',
  two: 'командах',
  many: 'командах',
  zero: 'командах',
  other: 'командах',
};

export function getTeamsCountText(count: number) {
  return `${count} ${getPluralForm(count, teamsCountForms)}`;
}
