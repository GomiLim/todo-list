import React, { HtmlHTMLAttributes } from 'react';

import styled from 'styled-components';
import { CommonCheckBox } from 'components/CheckBox';
import { TagItem } from '..';
import { MAIN_COLOR, SECONDARY_COLOR_WHITE } from 'libs/constant';
import { useStore } from 'hooks';
import { TodoData } from 'stores/todo';
import { TagData } from 'stores/tag';
import { useObserver } from 'mobx-react';

interface PropsTodoListItem extends HtmlHTMLAttributes<HTMLDivElement> {
  todoItem: TodoData;
  handleEditMode: (item: TodoData) => void;
}

const StyledTodoListItem = styled.div<{ checkBoxId: string }>`
  &:hover {
    background-color: ${MAIN_COLOR};

    .title,
    .content {
      color: ${SECONDARY_COLOR_WHITE};
    }

    input[type='checkbox'] + label {
      background: ${MAIN_COLOR};
      border: 1px solid ${SECONDARY_COLOR_WHITE};
      color: ${MAIN_COLOR};

      &::after {
        background-color: ${SECONDARY_COLOR_WHITE};
      }
    }

    input[id=${props => props.checkBoxId}]:checked + label {
      position: relative;
      background: ${SECONDARY_COLOR_WHITE};
      border: 1px solid ${MAIN_COLOR};

      &::after {
        content: '';
        pointer-events: none;
        width: 30px;
        height: 30px;
        background-color: transparent;
        text-align: center;
        position: absolute;
      }
    }

    .todo-item-buttons {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const TodoListItem = (props: PropsTodoListItem) => {
  const { todoItem, handleEditMode } = props;
  const { todo } = useStore();

  const handleCompleteTodo = (checkd: boolean) => {
    todo.changeIsComplete(todoItem.id, checkd);
  };

  const handleRemoveTodo = () => {
    todo.removeTodo(todoItem.id);
  };

  return useObserver(() => (
    <StyledTodoListItem
      className="todo-list-item"
      checkBoxId={`todo-check-${todoItem.id}`}
    >
      <CommonCheckBox
        id={`todo-check-${todoItem.id}`}
        onChange={handleCompleteTodo}
        checkStatus={todoItem.isComplete}
      />
      <div className="todo-item-area">
        <div className="todo-item-buttons">
          <button
            className="edit-buttons"
            onClick={() => handleEditMode(todoItem)}
          >
            수정
          </button>
          <button className="delete-buttons" onClick={handleRemoveTodo}>
            삭제
          </button>
        </div>
        <div className="todo-item-content-area">
          <div className="todo-item-content">
            <p className="title"> {todoItem.title}</p>
            <p className="content"> {todoItem.content}</p>
          </div>
        </div>
        <div className="todo-item-tag-area">
          {todoItem.tagList.map((tag: TagData, index: number) => {
            return (
              <TagItem
                key={`${tag.text}-${index}`}
                id={`todo-${tag.id}`}
                status
                tag={tag}
              />
            );
          })}
        </div>
      </div>
    </StyledTodoListItem>
  ));
};

export default React.memo(TodoListItem);
