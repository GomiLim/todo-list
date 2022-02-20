import React, { HTMLAttributes, useEffect } from 'react';
import { TodoListInterface } from 'models';
import { TodoListItem } from 'components';

interface PropsTodoList extends HTMLAttributes<HTMLDivElement> {
  todoList: TodoListInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
}

const TodoList = (props: PropsTodoList) => {
  const { todoList, setTodoList } = props;
  const dummyTodoList = [
    {
      id: String(Date.now() + 1),
      title: '테스트1',
      content: '테스트입니다.',
      tagList: [
        {
          text: 'dsfkjhsdjkfhjsdkfhjk',
          tagIcoColor: '#a760e9',
          id: '1645350781631'
        },
        {
          text: 'sdfjnsdjkfnjdkfhkjds',
          tagIcoColor: '#a760e9',
          id: '1645350784799'
        },
        {
          text: 'dsfkjhsdjkfhjsdkfhjk',
          tagIcoColor: '#a760e9',
          id: '1645350781631'
        },
        {
          text: 'sdfjnsdjkfnjdkfhkjds',
          tagIcoColor: '#a760e9',
          id: '1645350784799'
        },
        {
          text: 'dsfkjhsdjkfhjsdkfhjk',
          tagIcoColor: '#a760e9',
          id: '1645350781631'
        }
      ],
      isComplete: false
    },
    {
      id: String(Date.now() + 2),
      title: '테스트2',
      content: '테스트입니다.',
      tagList: [],
      isComplete: false
    }
  ];

  // const removeList = (list: TodoListInterface[], item: TodoListInterface) => {
  //   return list.filter(
  //     (prevItem: TodoListInterface) => prevItem.id !== item.id
  //   );
  // };

  // const createList = (
  //   list: TodoListInterface[] = [],
  //   item: TodoListInterface
  // ) => {
  //   return list.concat(item);
  // };

  useEffect(() => {
    setTodoList(dummyTodoList);
  }, []);

  return (
    <div className="todo-list-area">
      {todoList.map((item: TodoListInterface) => {
        return (
          <TodoListItem key={item.id} todo={item} setTodoList={setTodoList} />
        );
      })}
    </div>
  );
};

export default React.memo(TodoList);
