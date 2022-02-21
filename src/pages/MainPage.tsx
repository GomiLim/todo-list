import React, { useState } from 'react';
import { Header, Search, Tags, Todo } from 'containers';

import { PropsTagItem, TodoListInterface } from 'models';

const MainPage = () => {
  const [todoList, setTodoList] = useState<TodoListInterface[]>(
    JSON.parse(localStorage.getItem('todo-list') as string) ?? []
  );
  const [tagList, setTagList] = useState<PropsTagItem[]>(
    JSON.parse(localStorage.getItem('tag-list') as string) ?? []
  );
  const [filter, setFilter] = useState<PropsTagItem[]>([]);

  return (
    <div className="main-page">
      <Header />
      <Tags
        tagList={tagList}
        setTagList={setTagList}
        setFilter={setFilter}
        filter={filter}
      />
      <Search />
      <Todo
        todoList={todoList}
        setTodoList={setTodoList}
        tagList={tagList}
        setTagList={setTagList}
      />
    </div>
  );
};

export default React.memo(MainPage);
