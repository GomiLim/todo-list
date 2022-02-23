import React, { HTMLAttributes } from 'react';
import { TodoListInterface } from 'models';
import { TodoListItem } from 'components';

interface PropsTodoList extends HTMLAttributes<HTMLDivElement> {
  todoList: TodoListInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  removeTodo: (
    list: TodoListInterface[],
    item: TodoListInterface
  ) => TodoListInterface[];
  setOpenCreateSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList = (props: PropsTodoList) => {
  const { todoList, setTodoList, removeTodo, setOpenCreateSheet } = props;

  const handleRemoveTodo = (item: TodoListInterface) => {
    setTodoList(prevList => removeTodo(prevList, item));
  };

  const handleEditMode = (item: TodoListInterface) => {
    sessionStorage.setItem('edit-todo', JSON.stringify(item));
    setOpenCreateSheet(true);
  };

  return (
    <div className="todo-list-area">
      {todoList.map((item: TodoListInterface, index: number) => {
        return (
          <TodoListItem
            key={`todo-item-${item.id + index}`}
            todo={item}
            setTodoList={setTodoList}
            removeTodo={handleRemoveTodo}
            editTodo={handleEditMode}
          />
        );
      })}
    </div>
  );
};

export default React.memo(TodoList);
