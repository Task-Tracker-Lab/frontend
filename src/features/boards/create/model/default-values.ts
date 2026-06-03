import { CreateBoardFormValues } from './type';

export function getDefaultCreateBoardValues(): CreateBoardFormValues {
  return {
    name: '',
    position: 0,
    settings: {},
  };
}
