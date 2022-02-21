import React, { HTMLAttributes, useContext } from 'react';
import { TodoListInterface } from 'models';
import { TodoListItem } from 'components';
import { ModalContext } from 'context/ModalContext';

interface PropsTodoList extends HTMLAttributes<HTMLDivElement> {
  todoList: TodoListInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  removeTodo: (
    list: TodoListInterface[],
    item: TodoListInterface
  ) => TodoListInterface[];
}

const TodoList = (props: PropsTodoList) => {
  const { todoList, setTodoList, removeTodo } = props;
  const { openModal } = useContext(ModalContext);

  const handleRemoveTodo = (item: TodoListInterface) => {
    setTodoList(prevList => removeTodo(prevList, item));
  };

  const handleEditMode = (item: TodoListInterface) => {
    sessionStorage.setItem('edit-todo', JSON.stringify(item));
    openModal();
  };

  return (
    <div className="todo-list-area">
      {todoList.map((item: TodoListInterface) => {
        return (
          <TodoListItem
            key={item.id}
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
