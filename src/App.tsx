import React, { useEffect, useReducer } from 'react';
import './App.css';

// Components
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';
import { Todo, TodoState } from './model';

// API
import { getTodosApi, toogleDoneApi } from './api/todosApi';

// STATE BINDING
import { TodoReducer } from './reducers/Todo.reducer';
import { TYPE } from './actions/type';
import CustomContext from './hooks/CustomContext.hook';

// Drag'n Drop
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const initialState: TodoState = {
    todos: [],
    todosCompleted: [],
  };

  const [todoState, todoDispatch] = useReducer(TodoReducer, initialState);

  const providerState = {
    todoState,
    todoDispatch,
  };

  const getTodos = async () => {
    const response: Todo[] | undefined = await getTodosApi();

    if (response) {
      todoDispatch({ type: TYPE.GET_TODOS, payload: response });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    // let active = todoState.todos,
    //   complete = todoState.todosCompleted;

    if (source.droppableId === 'TodosList') {
      // active.splice(source.index, 1);
      const response = await toogleDoneApi(draggableId, true);

      if (response) {
        todoDispatch({ type: TYPE.DONE_TODO, payload: response });
      }
    } else {
      // complete.splice(source.index, 1);
      const response = await toogleDoneApi(draggableId, false);

      if (response) {
        todoDispatch({ type: TYPE.DONE_TODO, payload: response });
      }
    }
  };

  return (
    <CustomContext.Provider value={providerState}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='App'>
          <span className='heading'>Todos-React-App</span>
          <InputTodo />
          <TodoList />
        </div>
      </DragDropContext>
    </CustomContext.Provider>
  );
};

export default App;
