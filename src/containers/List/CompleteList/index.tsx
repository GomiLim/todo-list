import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { useStore } from 'hooks';
import { TodoListItem } from 'components';
import { TodoData } from 'stores/todo';
import EmptyContent from 'containers/Empty/EmptyContent';

const CompleteList = () => {
  const { todo } = useStore();
  const [closeCompleteArea, setCloseCompleteArea] = useState<boolean>(false);

  const toggleCloseArea = () => {
    setCloseCompleteArea(prev => !prev);
  };

  return useObserver(() => (
    <div className={`todo-complete-area ${closeCompleteArea ? 'on' : 'off'}`}>
      <span className="toggle-complete-area">
        <button onClick={toggleCloseArea}>
          {closeCompleteArea ? '닫기' : '완료 리스트 모아보기'}
        </button>
      </span>
      <div className={`todo-complete-toogle-area`}>
        <div className="complete-title">Complete!</div>
        <div className="complete-todo">
          {todo.completeCount ? (
            <>
              {todo.todoData
                .filter((item: TodoData) => item.isComplete)
                .map((item: TodoData, index: number) => {
                  return (
                    <TodoListItem
                      key={`complete-todo-item-${item.id + index}`}
                      todoItem={item}
                    />
                  );
                })}
            </>
          ) : (
            <EmptyContent className="todo-complete-area">
              완료한 리스트가없습니다.
            </EmptyContent>
          )}
        </div>
      </div>
    </div>
  ));
};

export default React.memo(CompleteList);
