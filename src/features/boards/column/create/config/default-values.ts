import { PROJECT_COLORS } from 'entities/project';
import { CreateBoardColumnFormValues } from '../model/types';

export function getDefaultCreateBoardColumnValues(position = 0): CreateBoardColumnFormValues {
  return {
    title: '',
    color: PROJECT_COLORS[0],
    position,
  };
}
