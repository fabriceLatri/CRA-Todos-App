import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import './styles.css';
import { deleteTodoApi, toogleDoneApi, updateTodoApi } from '../api/todosApi';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(
    todo.description ? todo.description : ''
  );

  const handleDone = async (id: string) => {
    const todoToUpdate: Todo | undefined = todos.find(
      (todo) => todo._id === id
    );

    if (todoToUpdate !== undefined) {
      const todoUpdated: Todo | undefined = await toogleDoneApi(
        todoToUpdate._id,
        !todoToUpdate.done
      );

      if (todoUpdated !== undefined) {
        setTodos(
          todos.map((todo) =>
            todo._id === todoUpdated._id
              ? { ...todo, done: todoUpdated.done }
              : todo
          )
        );
      }
    }
  };

  const handleDelete = async (id: string) => {
    const todoDeleted: Todo | undefined = await deleteTodoApi(id);
    if (typeof todoDeleted !== 'undefined')
      setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const todo: Todo | undefined = todos.find((todo) => todo._id === id);

    if (todo !== undefined) {
      todo.title = title;
      todo.description = description;

      const todoUpdated: Todo | undefined = await updateTodoApi(todo);

      if (todoUpdated !== undefined) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, isDone: !todo.done } : todo
          )
        );
        setEdit(false);
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      className='todos__single'
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        handleEdit(e, todo._id)
      }>
      {edit ? (
        <div>
          <div className='todos__single--form-group'>
            <label htmlFor='todoTitle'>Title</label>
            <input
              ref={inputRef}
              id='todoTitle'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
              className='todos__single--text'
            />
          </div>
          <div className='todos__single--form-group'>
            <label htmlFor='todoDescription'>Description</label>
            <input
              value={description}
              id='todoDescription'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
              className='todos__single--text'
            />
          </div>
          <button type='submit' className='todos__single--submit'>
            Edit
          </button>
        </div>
      ) : todo.done ? (
        <s className='todos__single--text'>{todo.title}</s>
      ) : (
        <span className='todos__single--text'>{todo.title}</span>
      )}

      <div className={edit ? 'todos__single--aside-icons' : ''}>
        <span
          className='icon'
          onClick={() => {
            if (!edit && !todo.done) {
              setEdit(!edit);
            }
          }}>
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
