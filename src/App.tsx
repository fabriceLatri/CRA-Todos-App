import React, { useEffect, useState } from 'react';
import './App.css';

// Components
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';
import { Todo } from './model';

// API
import { getTodosApi } from './api/todosApi';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodosApi().then((dataApiTodos: Todo[] | string | undefined) => {
      if (
        (dataApiTodos as Todo[]) &&
        dataApiTodos !== undefined &&
        typeof dataApiTodos !== 'string'
      )
        setTodos(dataApiTodos);
    });
  }, []);

  console.log(todos);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(todo);

    // if (todo) {
    //   setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    //   setTodo('');
    // }
  };

  return (
    <div className='App'>
      <span className='heading'>Todos-React-App</span>
      <InputTodo todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
