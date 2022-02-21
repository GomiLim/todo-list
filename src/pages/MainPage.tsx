import React, { useState, useEffect } from 'react';
import { Header, Search, Tags, Todo } from 'containers';

import { PropsTagItem, TodoListInterface } from 'models';
import { findSameItem } from 'libs/utill';

const MainPage = () => {
  const [todoList, setTodoList] = useState<TodoListInterface[]>(
    JSON.parse(localStorage.getItem('todo-list') as string) ?? []
  );
  const [tagList, setTagList] = useState<PropsTagItem[]>(
    JSON.parse(localStorage.getItem('tag-list') as string) ?? []
  );
  const [filter, setFilter] = useState<PropsTagItem[]>([]);
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
    filter: PropsTagItem[],
    todoList: TodoListInterface[]
  ) => {
    const _todoList = [...todoList];
    if (!filter.length) return _todoList;
    return _todoList.filter((todoItem: TodoListInterface) => {
      return todoItem.tagList.find((todoTag: PropsTagItem) => {
        return findSameItem(filter, 'id', todoTag.id) !== -1;
      });
    });
  };

  const getFilteredTodoList = () => {
    let filteredTodoList = filterTodoListByActiveTags(filter, todoList);
    filteredTodoList = filterTodoListBySearchKeyword(keyword, filteredTodoList);
    if (filteredTodoList.length) return filteredTodoList;
    else if (!filteredTodoList.length && keyword) return filteredTodoList;
    else return todoList;
  };

  const updateTodoForTagChange = (
    todoList: TodoListInterface[],
    tagList: PropsTagItem[]
  ) => {
    const reflectingTagChange = todoList.map((todo: TodoListInterface) => {
      const newTagList: PropsTagItem[] = [];
      todo.tagList.filter((todoTag: PropsTagItem) => {
        if (findSameItem(tagList, 'id', todoTag.id) !== -1) {
          return newTagList.push({
            ...todoTag,
            text: tagList[findSameItem(tagList, 'id', todoTag.id)].text
          });
        }
      });
      return { ...todo, tagList: newTagList };
    });
    setTodoList(reflectingTagChange);
  };

  const updateFilterForTagChange = (
    tagList: PropsTagItem[],
    filterList: PropsTagItem[]
  ) => {
    const reflectingTagChange = filterList.filter(filter =>
      tagList.find(item => item.id === filter.id)
    );
    setFilter(reflectingTagChange);
  };

  useEffect(() => {
    const origin = localStorage.getItem('todo-list')
      ? JSON.parse(localStorage.getItem('todo-list') as string)
      : [];
    updateTodoForTagChange(origin, tagList);
    updateFilterForTagChange(filter, tagList);
  }, [tagList]);

  return (
    <div className="main-page">
      <Header todoList={todoList} />
      <Tags
        tagList={tagList}
        setTagList={setTagList}
        setFilter={setFilter}
        filter={filter}
      />
      <Search setKeyword={setKeyword} keyword={keyword} />
      <Todo
        todoList={getFilteredTodoList()}
        originTodoList={todoList}
        setTodoList={setTodoList}
        tagList={tagList}
        setTagList={setTagList}
        filter={filter}
        keyword={keyword}
      />
    </div>
  );
};

export default React.memo(MainPage);
