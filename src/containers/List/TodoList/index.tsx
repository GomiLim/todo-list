import React, { HTMLAttributes } from 'react';
import { TodoListItem } from 'components';
import { useStore } from 'hooks';
import { TodoData } from 'stores/todo';
import { useObserver } from 'mobx-react';

interface PropsTodoList extends HTMLAttributes<HTMLDivElement> {
  setOpenCreateSheet: React.Dispatch<React.SetStateAction<boolean>>;
  filterList: TodoData[];
}

const TodoList = (props: PropsTodoList) => {
  const { todo } = useStore();
  const { setOpenCreateSheet, filterList } = props;

  const handleEditMode = (item: TodoData) => {
    sessionStorage.setItem('edit-todo', JSON.stringify(item));
    setOpenCreateSheet(true);
  };

  return useObserver(() => (
    <div className="todo-list-area">
      {filterList.length ? (
        <>
          {filterList.map((item: TodoData, index: number) => {
            return (
              <TodoListItem
                key={`todo-item-${item.id + index}`}
                todoItem={item}
                handleEditMode={handleEditMode}
              />
            );
          })}
        </>
      ) : (
        <>
          {todo.todoData.map((item: TodoData, index: number) => {
            return (
              <TodoListItem
                key={`todo-item-${item.id + index}`}
                todoItem={item}
                handleEditMode={handleEditMode}
              />
            );
          })}
        </>
      )}
    </div>
  ));
};

export default React.memo(TodoList);
