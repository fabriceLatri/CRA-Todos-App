import React, { useEffect, useState } from 'react';
import './App.css';

// Components
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';
import { Todo, NewTodo } from './model';

// API
import { getTodosApi, createTodoApi } from './api/todosApi';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodosApi()
      .then((dataApiTodos: Todo[] | string | undefined) => {
        if (
          (dataApiTodos as Todo[]) &&
          dataApiTodos !== undefined &&
          typeof dataApiTodos !== 'string'
        )
          setTodos(dataApiTodos);
      })
      .catch(console.error);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title) {
      const newTodo: NewTodo = {
        title,
        done: false,
      };

      const todoCreated = await createTodoApi(newTodo);

      if (todoCreated !== undefined && typeof todoCreated !== 'string') {
        setTodos([...todos, todoCreated]);
        setTitle('');
      }
    }
  };

  return (
    <div className='App'>
      <span className='heading'>Todos-React-App</span>
      <InputTodo
        todoTitle={title}
        setTodoTitle={setTitle}
        handleAdd={handleAdd}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
