import React, { useState, useRef, useEffect } from 'react';
import { Todo, AppUseReducerInterface } from '../model';

import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import './styles.css';
import { deleteTodoApi, toogleDoneApi, updateTodoApi } from '../api/todosApi';
import { useCustomContext } from '../hooks/CustomContext.hook';
import { TYPE } from '../actions/type';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  todo: Todo;
  index: number;
}

export const SingleTodo: React.FC<Props> = ({ todo, index }) => {
  const providerState = useCustomContext() as AppUseReducerInterface;

  const {
    todoState: { todos, todosCompleted },
    todoDispatch,
  } = providerState;

  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(
    todo.description ? todo.description : ''
  );
  const [done, setDone] = useState<boolean>(todo.done);

  const handleDone = async (id: string) => {
    let todoToUpdate: Todo | undefined;

    if (todo.done) {
      todoToUpdate = todosCompleted.find((todo) => todo._id === id);
    } else {
      todoToUpdate = todos.find((todo) => todo._id === id);
    }

    if (todoToUpdate) {
      const response: Todo | undefined = await toogleDoneApi(
        todoToUpdate._id,
        !todoToUpdate.done
      );

      if (response) {
        todoDispatch({ type: TYPE.DONE_TODO, payload: response });
        setDone(!done);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const response: Todo | undefined = await deleteTodoApi(id);
    if (response) todoDispatch({ type: TYPE.DELETE_TODO, payload: response });
    // setTodos(todos.filter((todo) => todo._id !== id));
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

      const response: Todo | undefined = await updateTodoApi(todo);

      if (response) {
        todoDispatch({ type: TYPE.EDIT_TODO, payload: response });
        setEdit(false);
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    return () => {
      setDone(todo.done);
    };
  }, [edit, done, todo.done]);

  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided) => (
        <form
          className='todos__single'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleEdit(e, todo._id)
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
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
          ) : done ? (
            <s className='todos__single--text'>{todo.title}</s>
          ) : (
            <span className='todos__single--text'>{todo.title}</span>
          )}

          <div className={edit ? 'todos__single--aside-icons' : ''}>
            <span
              className='icon'
              onClick={() => {
                if (!todo.done) {
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
      )}
    </Draggable>
  );
};
