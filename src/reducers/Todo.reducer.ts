import { ActionTypes, TYPE } from '../actions/type';
import { TodoState } from '../model';

const initialState: TodoState = {
  todos: [],
  todosCompleted: [],
};

export const TodoReducer = (
  state: TodoState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case TYPE.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TYPE.GET_TODOS:
      const todos = action.payload.filter((todo) => todo.done === false);
      const todosCompleted = action.payload.filter(
        (todo) => todo.done === true
      );
      return {
        ...state,
        todos,
        todosCompleted,
      };

    case TYPE.DELETE_TODO:
      if (action.payload.done) {
        return {
          ...state,
          todosCompleted: state.todosCompleted.filter(
            (todo) => todo._id !== action.payload._id
          ),
        };
      } else {
        return {
          ...state,
          todos: state.todos.filter((todo) => todo._id !== action.payload._id),
        };
      }

    case TYPE.EDIT_TODO:
      if (action.payload.done) {
        return {
          ...state,
          todosCompleted: state.todosCompleted.map((todo) =>
            todo._id === action.payload._id ? action.payload : todo
          ),
        };
      } else {
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo._id === action.payload._id ? action.payload : todo
          ),
        };
      }

    case TYPE.DONE_TODO:
      if (action.payload.done) {
        return {
          ...state,
          todos: state.todos.filter((todo) => todo._id !== action.payload._id),
          todosCompleted: [...state.todosCompleted, action.payload],
        };
      } else {
        return {
          ...state,
          todos: [...state.todos, action.payload],
          todosCompleted: state.todosCompleted.filter(
            (todo) => todo._id !== action.payload._id
          ),
        };
      }

    default:
      return state;
  }
};
