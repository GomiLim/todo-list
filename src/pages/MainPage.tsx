import React, { useState, useEffect, useRef } from 'react';
import { Header, Search, Tags, Todo } from 'containers';

import { TagItemInterface, TodoListInterface } from 'models';
import { findSameItem } from 'libs/utill';
import useStore from 'useStore';
import { useObserver } from 'mobx-react';
import { TagData } from 'stores/filter';

const MainPage = () => {
  const { todo, filter } = useStore();
  const firstRender = useRef<boolean>(true);
  const [tagList, setTagList] = useState<TagData[]>(
    JSON.parse(localStorage.getItem('tag-list') as string) ?? []
  );
  const [keyword, setKeyword] = useState<string>('');

  const filterTodoListBySearchKeyword = (
    keyword: string | undefined,
    todoList: TodoListInterface[]
  ) => {
    const _todoList = [...todoList];
    if (!keyword) return _todoList;
    return _todoList.filter((todoItem: TodoListInterface) => {
      return todoItem.title.includes(keyword);
    });
  };

  const filterTodoListByActiveTags = (
    filter: TagData[],
    todoList: TodoListInterface[]
  ) => {
    const _todoList = [...todoList];
    if (!filter.length) return _todoList;
    return _todoList.filter((todoItem: TodoListInterface) => {
      return todoItem.tagList.find((todoTag: TagItemInterface) => {
        return findSameItem(filter, 'id', todoTag.id) !== -1;
      });
    });
  };

  const getFilteredTodoList = () => {
    let filteredTodoList = filterTodoListByActiveTags(
      filter.activeFilter,
      todo.todoData
    );
    filteredTodoList = filterTodoListBySearchKeyword(keyword, filteredTodoList);

    if (
      filteredTodoList.length ||
      (!filteredTodoList.length && filter.activeFilter.length) ||
      (!filteredTodoList.length && keyword)
    ) {
      return filteredTodoList;
    } else {
      return todo.todoData;
    }
  };

  useEffect(() => {
    getFilteredTodoList();
  }, [todo.filterTodoData]);

  useEffect(() => {
    if (!firstRender.current) {
      const origin = localStorage.getItem('todo-list')
        ? JSON.parse(localStorage.getItem('todo-list') as string)
        : [];
      todo.updateTodoListOnTagChange(origin, tagList);
      filter.updateFilter(tagList, filter.activeFilter);
    }
    return () => {
      firstRender.current = false;
    };
  }, [tagList]);

  useEffect(() => {
    todo.initTodo(
      localStorage.getItem('todo-list')
        ? JSON.parse(localStorage.getItem('todo-list') as string)
        : []
    );
    filter.initFilter(
      localStorage.getItem('tag-filter')
        ? JSON.parse(localStorage.getItem('tag-filter') as string)
        : []
    );
  }, []);

  useEffect(() => {
    todo.todoData &&
      localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  }, [todo.todoData, tagList]);

  return useObserver(() => (
    <div className="main-page">
      <Header todoList={getFilteredTodoList()} />
      <Tags tagList={tagList} setTagList={setTagList} />
      <Search setKeyword={setKeyword} keyword={keyword} />
      <Todo tagList={tagList} setTagList={setTagList} keyword={keyword} />
    </div>
  ));
};

export default React.memo(MainPage);
