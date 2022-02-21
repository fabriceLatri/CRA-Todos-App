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
