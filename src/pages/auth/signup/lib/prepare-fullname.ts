import { capitalize } from 'shared/lib/utils';

const STRING_SEPARATOR = ' ';

export const prepareFullName = (name: string): { firstName: string; lastName: string } => {
  const [firstName = '', lastName = ''] = name
    .trim()
    .replace(/\s+/gm, STRING_SEPARATOR)
    .split(STRING_SEPARATOR)
    .map(capitalize);

  return { firstName, lastName };
};
