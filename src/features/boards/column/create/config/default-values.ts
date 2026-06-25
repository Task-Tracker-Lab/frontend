import { DEFAULT_COLUMN_COLOR } from '../config/consts';
import { CreateBoardColumnFormValues } from '../model/types';

export function getDefaultCreateBoardColumnValues(position = 0): CreateBoardColumnFormValues {
  return {
    title: '',
    color: DEFAULT_COLUMN_COLOR,
    position,
  };
}
