import { CreateBoardColumnFormValues } from './type';

export function getDefaultCreateBoardColumnValues(position = 0): CreateBoardColumnFormValues {
  return {
    name: '',
    position,
    color: '',
  };
}
