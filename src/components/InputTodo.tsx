import React, { useRef } from 'react';
import './styles.css';

interface Props {
  todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export const InputTodo: React.FC<Props> = ({
  todoTitle,
  setTodoTitle,
  handleAdd,
}) => {
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
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        className='input__box'
        placeholder='Entrez une tâche à effectuer'
      />
      <button className='input_submit' type='submit'>
        Go
      </button>
    </form>
  );
};
