import React, { useRef, useState } from 'react';
import './styles.css';

// HOOKS
import { useCustomContext } from '../hooks/CustomContext.hook';
import { AppUseReducerInterface, NewTodo } from '../model';
import { TYPE } from '../actions/type';
import { createTodoApi } from '../api/todosApi';

export const InputTodo: React.FC = () => {
  const providerState = useCustomContext() as AppUseReducerInterface;

  const { todoDispatch } = providerState;

  const [title, setTitle] = useState<string>('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title) {
      const newTodo: NewTodo = {
        title,
        done: false,
      };

      const response = await createTodoApi(newTodo);

      if (response) {
        todoDispatch({ type: TYPE.ADD_TODO, payload: response });
        setTitle('');
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className='input'
      onSubmit={(e: React.FormEvent<Element>) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}>
      <input
        ref={inputRef}
        type='input'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='input__box'
        placeholder='Entrez une tâche à effectuer'
      />
      <button className='input_submit' type='submit'>
        Go
      </button>
    </form>
  );
};
