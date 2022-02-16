import React from 'react';
import { Todo } from '../model';

import { AiFillEdit } from 'react-icons/ai';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  return (
    <form className='todos__single'>
      <span className='todos__single--text'>{todo.todo}</span>

      <div>
        <span className='icon'>
          <AiFillEdit />
        </span>
        <span className='icon'></span>
        <span className='icon'></span>
      </div>
    </form>
  );
};
