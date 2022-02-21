import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { Portal, TodoList } from 'containers';
import { PropsTagItem, TodoListInterface } from 'models';
import { ModalContext } from 'context/ModalContext';
import { CreatTodoModal } from 'components';
import EmptyContent from 'containers/Empty/EmptyContent';

interface PropsTodo extends HTMLAttributes<HTMLDivElement> {
  todoList: TodoListInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  tagList: PropsTagItem[];
  setTagList: React.Dispatch<React.SetStateAction<PropsTagItem[]>>;
}

const Todo = (props: PropsTodo) => {
  const { todoList, setTodoList, tagList, setTagList } = props;
  const { isModalVisible, openModal } = useContext(ModalContext);

  const [editItem, setEditItem] = useState<TodoListInterface | undefined>(
    undefined
  );

  const removeTodo = (list: TodoListInterface[], item: TodoListInterface) => {
    return list.filter(
      (prevItem: TodoListInterface) => prevItem.id !== item.id
    );
  };

  const createTodo = (
    list: TodoListInterface[] = [],
    item: TodoListInterface
  ) => {
    return list.concat(item);
  };

  const editTodo = (
    list: TodoListInterface[] = [],
    item: TodoListInterface
  ) => {
    const updateList = list.map(prevItem => {
      if (prevItem.id === item.id) {
        return item;
      }
      return prevItem;
    });
    return updateList;
  };

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="todo-area">
      {todoList.length ? (
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          removeTodo={removeTodo}
        />
      ) : (
        <EmptyContent>할 일을 추가해 보세요 : )</EmptyContent>
      )}

      <div className="todo-button-area">
        <button className="creat-todo" onClick={openModal}>
          + ADD NEW TASK
        </button>
      </div>
      {isModalVisible && (
        <Portal>
          <CreatTodoModal
            tagList={tagList}
            setTagList={setTagList}
            setTodoList={setTodoList}
            createTodo={createTodo}
            editTodo={editTodo}
            setEditItem={setEditItem}
            editItem={editItem}
            edit={editItem ? true : false}
          />
        </Portal>
      )}
    </div>
  );
};

export default React.memo(Todo);
