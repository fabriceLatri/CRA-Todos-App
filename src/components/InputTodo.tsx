import React, { useRef } from 'react';
import './styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

export const InputTodo: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
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
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className='input__box'
        placeholder='Entrez une tâche à effectuer'
      />
      <button className='input_submit' type='submit'>
        Go
      </button>
    </form>
  );
};
