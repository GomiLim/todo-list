import React, { HTMLAttributes, useContext, useState } from 'react';

import { Portal, TodoList, CreateTodo } from 'containers';
import { PortalContext } from 'context/PortalContext';
import EmptyContent from 'containers/Empty/EmptyContent';
import { ToastMessage } from 'components';
import { useStore } from 'hooks';
import { useObserver } from 'mobx-react';
import { TodoData } from 'stores/todo';

interface PropsTodo extends HTMLAttributes<HTMLDivElement> {
  keyword: string;
  filterList: TodoData[];
}

const Todo = (props: PropsTodo) => {
  const { todo } = useStore();

  const { keyword, filterList } = props;
  const { isToastVisible } = useContext(PortalContext);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [openCreateSheet, setOpenCreateSheet] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<TodoData | null>(null);

  return useObserver(() => (
    <div className="todo-area">
      {todo.todoData.length && filterList.length ? (
        <TodoList
          setOpenCreateSheet={setOpenCreateSheet}
          filterList={filterList}
        />
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
