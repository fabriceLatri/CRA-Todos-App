import axios, { AxiosResponse } from 'axios';
import { Todo } from '../model';

const baseAxios = axios.create({
  baseURL: 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodosApi = async () => {
  try {
    const response: AxiosResponse<Todo[]> = await baseAxios.get<Todo[]>(
      '/todos'
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
  }
};
