import React from 'react';
import { ActionTypes } from './actions/type';
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
}

export interface NewTodo {
  title: string;
  description?: string;
  done: false;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  done: boolean;
}

export interface TodoState {
  todos: Todo[];
  todosCompleted: Todo[];
}

export interface AppUseReducerInterface {
  todoState: TodoState;
  todoDispatch: React.Dispatch<ActionTypes>;
}
