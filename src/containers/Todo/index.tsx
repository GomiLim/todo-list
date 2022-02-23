import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { Portal, TodoList, CreateTodo } from 'containers';
import { TagItemInterface, TodoListInterface } from 'models';
import { PortalContext } from 'context/PortalContext';
import { ToastMessage } from 'components';
import EmptyContent from 'containers/Empty/EmptyContent';
import useStore from 'useStore';
import { useObserver } from 'mobx-react';

interface PropsTodo extends HTMLAttributes<HTMLDivElement> {
  tagList: TagItemInterface[];
  setTagList: React.Dispatch<React.SetStateAction<TagItemInterface[]>>;
  keyword: string;
}

const Todo = (props: PropsTodo) => {
  const { todo } = useStore();

  const { tagList, setTagList, keyword } = props;
  const { isToastVisible } = useContext(PortalContext);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [openCreateSheet, setOpenCreateSheet] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<TodoListInterface | null>(null);

  return useObserver(() => (
    <div className="todo-area">
      {todo.todoData.length ? (
        <TodoList setOpenCreateSheet={setOpenCreateSheet} />
      ) : (
        <EmptyContent>
          {keyword
            ? '검색 결과가 존재하지 않습니다 : ('
            : '할 일을 추가해 보세요 : )'}
        </EmptyContent>
      )}

      <div className="todo-button-area">
        <button
          className="create-todo"
          onClick={() => setOpenCreateSheet(true)}
        >
          + ADD NEW TODO
        </button>
      </div>
      {openCreateSheet && (
        <CreateTodo
          tagList={tagList}
          setTagList={setTagList}
          setEditItem={setEditItem}
          editItem={editItem}
          edit={editItem ? true : false}
          setToastMessage={setToastMessage}
          setOpenCreateSheet={setOpenCreateSheet}
        />
      )}

      {isToastVisible && (
        <Portal className="global-toast">
          <ToastMessage>
            <div>{toastMessage}</div>
          </ToastMessage>
        </Portal>
      )}
    </div>
  ));
};

export default React.memo(Todo);
