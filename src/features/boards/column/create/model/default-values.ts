import { DEFAULT_COLUMN_COLOR } from './consts';
import { CreateBoardColumnFormValues } from './type';

export function getDefaultCreateBoardColumnValues(position = 0): CreateBoardColumnFormValues {
  return {
    title: '',
    color: DEFAULT_COLUMN_COLOR,
    orderIndex: position,
  };
}
