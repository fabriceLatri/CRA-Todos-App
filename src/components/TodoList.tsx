import React from 'react';
import './styles.css';
import { AppUseReducerInterface } from '../model';
import { SingleTodo } from './SingleTodo';
import { useCustomContext } from '../hooks/CustomContext.hook';
import { Droppable } from 'react-beautiful-dnd';

export const TodoList: React.FC = () => {
  const providerState = useCustomContext() as AppUseReducerInterface;

  const {
    todoState: { todos, todosCompleted },
  } = providerState;

  return (
    <div className='container'>
      <Droppable droppableId='TodosList'>
        {(provided) => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo todo={todo} index={index} key={todo._id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided) => (
          <div
            className='todos remove'
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className='todos__heading'>Tasks Completed</span>
            {todosCompleted.map((todoComplete, index) => (
              <SingleTodo
                todo={todoComplete}
                index={index}
                key={todoComplete._id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
