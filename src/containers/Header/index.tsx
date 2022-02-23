import React from 'react';
import { Progress as TodoProgress, Today } from 'components';
import { TodoListInterface } from '../../models/index';

const Header = (todoList: { todoList: TodoListInterface[] }) => {
  return (
    <div className="header-area">
      <div className="today-area">
        <p className="today-title">today</p>
        <Today timezoneFormat="dd m-contraction" />
      </div>
      <TodoProgress
        className="task-progress-area"
        label={`${todoList ? todoList.todoList.length : 0}
        Task`}
        totalTodo={
          localStorage.getItem('todo-list') ? todoList.todoList.length : 0
        }
        completeTodo={
          localStorage.getItem('todo-list')
            ? todoList.todoList.filter(
                (item: TodoListInterface) => item.isComplete
              ).length
            : 0
        }
      />
    </div>
  );
};

export default React.memo(Header);
