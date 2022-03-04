import { Todo } from '../model';

export enum TYPE {
  ADD_TODO = 'ADD_TODO',
  GET_TODOS = 'GET_TODOS',
  DELETE_TODO = 'DELETE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  DONE_TODO = 'DONE_TODO',
}

export type ActionTypes =
  | { type: TYPE.ADD_TODO; payload: Todo }
  | { type: TYPE.GET_TODOS; payload: Todo[] }
  | { type: TYPE.DELETE_TODO; payload: Todo }
  | { type: TYPE.EDIT_TODO; payload: Todo }
  | { type: TYPE.DONE_TODO; payload: Todo };
