import { Action } from '../schemas/action.schema';

export type ActionsListResponse = {
  data: Action[];
  count: number;
};