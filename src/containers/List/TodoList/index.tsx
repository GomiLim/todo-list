import React, { HTMLAttributes } from 'react';
import { TodoListInterface } from 'models';
import { TodoListItem } from 'components';
import useStore from 'useStore';
import { TodoData } from 'stores/todo';
import { useObserver } from 'mobx-react';

interface PropsTodoList extends HTMLAttributes<HTMLDivElement> {
  setOpenCreateSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList = (props: PropsTodoList) => {
  const { todo } = useStore();
  const { setOpenCreateSheet } = props;

  const handleEditMode = (item: TodoListInterface) => {
    sessionStorage.setItem('edit-todo', JSON.stringify(item));
    setOpenCreateSheet(true);
  };

  return useObserver(() => (
    <div className="todo-list-area">
      {todo.todoData.map((item: TodoData, index: number) => {
        return (
          <TodoListItem
            key={`todo-item-${item.id + index}`}
            todoItem={item}
            handleEditMode={handleEditMode}
          />
        );
      })}
    </div>
  ));
};

export default React.memo(TodoList);
