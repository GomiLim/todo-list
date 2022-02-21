import React, { HtmlHTMLAttributes } from 'react';

import styled from 'styled-components';
import { CommonCheckBox } from 'components/CheckBox';
import { TagItem } from '..';
import { PropsTagItem, TodoListInterface } from 'models';
import { MAIN_COLOR, SECONDARY_COLOR_WHITE } from 'libs/constant';

interface PropsTodoListItem extends HtmlHTMLAttributes<HTMLDivElement> {
  todo: TodoListInterface;
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  removeTodo: (item: TodoListInterface) => void;
  editTodo: (item: TodoListInterface) => void;
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
  const { todo, setTodoList, removeTodo, editTodo } = props;

  const handleComplete = (
    list: TodoListInterface[],
    item: TodoListInterface,
    check: boolean
  ) => {
    const updateList = list.map(prevItem => {
      if (prevItem.id === item.id) {
        return { ...item, isComplete: check };
      }
      return prevItem;
    });
    return updateList;
  };

  const handleIsComplteTodo = (check: boolean) => {
    setTodoList(prevList => handleComplete(prevList, todo, check));
  };

  return (
    <StyledTodoListItem
      className="todo-list-item"
      checkBoxId={`todo-${todo.id}`}
    >
      <CommonCheckBox
        id={`todo-${todo.id}`}
        onChange={handleIsComplteTodo}
        checkStatus={todo.isComplete ?? false}
      />
      <div className="todo-item-area">
        <div className="todo-item-content-area">
          <div className="todo-item-content">
            <p className="title"> {todo.title}</p>
            <p className="content"> {todo.content}</p>
          </div>
          <div className="todo-item-buttons">
            <button className="edit-buttons" onClick={() => editTodo(todo)}>
              수정
            </button>
            <button className="delete-buttons" onClick={() => removeTodo(todo)}>
              삭제
            </button>
          </div>
        </div>
        <div className="todo-item-tag-area">
          {todo.tagList.map((tag: PropsTagItem, index: number) => {
            return (
              <TagItem
                key={`${tag.text}-${index}`}
                id={`todo-${tag.id}`}
                status
                tagIcoColor={tag.tagIcoColor}
                text={tag.text}
              />
            );
          })}
        </div>
      </div>
    </StyledTodoListItem>
  );
};

export default React.memo(TodoListItem);
