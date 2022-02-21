import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { Portal, TodoList } from 'containers';
import { TagItemInterface, TodoListInterface } from 'models';
import { ModalContext } from 'context/ModalContext';
import { CreateTodoModal } from 'components';
import EmptyContent from 'containers/Empty/EmptyContent';

interface PropsTodo extends HTMLAttributes<HTMLDivElement> {
  todoList: TodoListInterface[];
  originTodoList: TodoListInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  tagList: TagItemInterface[];
  setTagList: React.Dispatch<React.SetStateAction<TagItemInterface[]>>;
  filter: TagItemInterface[];
  keyword: string;
}

const Todo = (props: PropsTodo) => {
  const {
    todoList,
    originTodoList,
    setTodoList,
    tagList,
    setTagList,
    keyword
  } = props;
  const { isModalVisible, openModal } = useContext(ModalContext);

  const [editItem, setEditItem] = useState<TodoListInterface | null>(null);

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
    localStorage.setItem('todo-list', JSON.stringify(originTodoList));
  }, [todoList, tagList]);

  return (
    <div className="todo-area">
      {todoList.length ? (
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          removeTodo={removeTodo}
        />
      ) : (
        <EmptyContent>
          {keyword
            ? '검색 결과가 존재하지 않습니다 : ('
            : '할 일을 추가해 보세요 : )'}
        </EmptyContent>
      )}

      <div className="todo-button-area">
        <button className="create-todo" onClick={openModal}>
          + ADD NEW TASK
        </button>
      </div>
      {isModalVisible && (
        <Portal>
          <CreateTodoModal
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
