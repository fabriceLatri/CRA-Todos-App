import axios from 'axios';
import { NewTodo, Todo, TodoUpdate } from '../model';

const baseAxios = axios.create({
  baseURL: 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodosApi = async (): Promise<Todo[] | undefined> => {
  try {
    const response = await baseAxios.get<Todo[]>('/todos');

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const createTodoApi = async (
  newTodo: NewTodo
): Promise<Todo | undefined> => {
  try {
    const response = await baseAxios.post<Todo>('/todos', newTodo);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const deleteTodoApi = async (id: string): Promise<Todo | undefined> => {
  try {
    const response = await baseAxios.delete<Todo>('/todos/' + id);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const updateTodoApi = async ({
  _id,
  title,
  description,
  done,
}: Todo): Promise<Todo | undefined> => {
  try {
    const todoUpdate: TodoUpdate = { title, description, done: done };

    const response = await baseAxios.put<Todo>('/todos', {
      id: _id,
      data: todoUpdate,
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const toogleDoneApi = async (
  id: string,
  done: boolean
): Promise<Todo | undefined> => {
  try {
    const todoUpdate: TodoUpdate = {
      done,
    };

    const response = await baseAxios.put<Todo>('/todos', {
      id,
      data: todoUpdate,
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
