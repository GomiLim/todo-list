import React, { useState, useEffect, useRef } from 'react';
import { CompleteList, Header, Search, Tags, Todo } from 'containers';

import { findSameItem } from 'libs/utill';
import { useStore } from 'hooks';
import { useObserver } from 'mobx-react';
import { TagData } from 'stores/tag';
import { TodoData } from 'stores/todo';

const MainPage = () => {
  const { todo, filter, tag } = useStore();
  const firstRender = useRef<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');

  /* 검색창에 값 입력하여 Todo List 필터링 */
  const filterTodoListBySearchKeyword = (
    keyword: string | undefined,
    todoList: TodoData[]
  ) => {
    const _todoList = [...todoList];
    if (!keyword) return _todoList;
    return _todoList.filter((todoItem: TodoData) => {
      return todoItem.title.includes(keyword);
    });
  };

  /* 태그별로 필터링 */
  const filterTodoListByActiveTags = (
    filter: TagData[],
    todoList: TodoData[]
  ) => {
    const _todoList = [...todoList];
    if (!filter.length) return _todoList;
    return _todoList.filter((todoItem: TodoData) => {
      return todoItem.tagList.find((todoTag: TagData) => {
        return findSameItem(filter, 'id', todoTag.id) !== -1;
      });
    });
  };

  /* 태그별로 필터링 후 검색키워드 필터링이 진행됩니다. */
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

  /* localStorage에 데이터가 있다면, 초기값세팅을 해주고 없는경우엔 비 배열을 세팅해줍니다. */
  useEffect(() => {
    if (!firstRender.current) {
      const origin = localStorage.getItem('todo-list')
        ? JSON.parse(localStorage.getItem('todo-list') as string)
        : [];
      todo.updateTodoListOnTagChange(origin, tag.tagData);
      filter.updateFilter(tag.tagData, filter.activeFilter);
    }
    return () => {
      firstRender.current = false;
    };
  }, [tag.tagData]);

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
    tag.initTags(
      localStorage.getItem('tag-list')
        ? JSON.parse(localStorage.getItem('tag-list') as string)
        : []
    );
  }, []);

  useEffect(() => {
    todo.todoData &&
      localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  }, [todo.todoData, tag.tagData]);

  return useObserver(() => (
    <div className="main-page">
      <Header todoList={getFilteredTodoList()} />
      <CompleteList />
      <Tags />
      <Search setKeyword={setKeyword} keyword={keyword} />
      <Todo keyword={keyword} filterList={getFilteredTodoList()} />
    </div>
  ));
};

export default React.memo(MainPage);
