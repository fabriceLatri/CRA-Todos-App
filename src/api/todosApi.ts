import axios from 'axios';
import { newTodo, Todo } from '../model';

const baseAxios = axios.create({
  baseURL: 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodosApi = async () => {
  try {
    const response = await baseAxios.get<Todo[]>('/todos');

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const createTodoApi = async (
  newTodo: newTodo
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
