import React from 'react';
import { Todo } from '../model';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import './styles.css';
import { deleteTodoApi } from '../api/todosApi';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const handleDone = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = async (id: string) => {
    const todoDeleted: Todo | undefined = await deleteTodoApi(id);
    if (typeof todoDeleted !== 'undefined')
      setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEdit = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <form className='todos__single'>
      {todo.isDone ? (
        <s className='todos__single--text'>{todo.title}</s>
      ) : (
        <span className='todos__single--text'>{todo.title}</span>
      )}

      <div>
        <span className='icon' onClick={() => handleEdit(todo._id)}>
          <AiFillEdit />
        </span>
        <span className='icon' onClick={() => handleDelete(todo._id)}>
          <AiFillDelete />
        </span>
        <span className='icon' onClick={() => handleDone(todo._id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};
