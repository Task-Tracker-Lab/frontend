import { getPluralForm, type PluralForms } from 'shared/lib/utils';

const projectsCountForms: PluralForms = {
  one: 'проекте',
  few: 'проектах',
  two: 'проектах',
  many: 'проектах',
  zero: 'проектах',
  other: 'проектах',
};

export function getProjectsCountText(count: number) {
  return `${count} ${getPluralForm(count, projectsCountForms)}`;
}
