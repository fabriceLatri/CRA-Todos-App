export interface Todo {
  _id: string;
  title: string;
  description?: string;
  isDone: boolean;
}

export interface newTodo {
  title: string;
  description?: string;
  done: false;
}
