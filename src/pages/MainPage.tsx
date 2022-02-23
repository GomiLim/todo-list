import React, { useState, useEffect } from 'react';
import { Header, Search, Tags, Todo } from 'containers';

import { TagItemInterface, TodoListInterface } from 'models';
import { findSameItem } from 'libs/utill';
import useStore from 'useStore';
import { useObserver } from 'mobx-react';

const MainPage = () => {
  const { todo } = useStore();

  const [tagList, setTagList] = useState<TagItemInterface[]>(
    JSON.parse(localStorage.getItem('tag-list') as string) ?? []
  );
  const [filter, setFilter] = useState<TagItemInterface[]>([]);
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
    filter: TagItemInterface[],
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
    let filteredTodoList = filterTodoListByActiveTags(filter, todo.todoData);
    filteredTodoList = filterTodoListBySearchKeyword(keyword, filteredTodoList);

    if (
      filteredTodoList.length ||
      (!filteredTodoList.length && filter.length) ||
      (!filteredTodoList.length && keyword)
    ) {
      return filteredTodoList;
    } else {
      return todo.todoData;
    }
  };

  const updateTodoForTagChange = (
    todoList: TodoListInterface[],
    tagList: TagItemInterface[]
  ) => {
    const reflectingTagChange = todoList.map((todo: TodoListInterface) => {
      const newTagList: TagItemInterface[] = [];
      todo.tagList.filter((todoTag: TagItemInterface) => {
        if (findSameItem(tagList, 'id', todoTag.id) !== -1) {
          return newTagList.push({
            ...todoTag,
            text: tagList[findSameItem(tagList, 'id', todoTag.id)].text
          });
        }
      });
      return { ...todo, tagList: newTagList };
    });

    todo.initTodo(reflectingTagChange);
  };

  const updateFilterForTagChange = (
    tagList: TagItemInterface[],
    filterList: TagItemInterface[]
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

  useEffect(() => {
    todo.initTodo(
      localStorage.getItem('todo-list')
        ? JSON.parse(localStorage.getItem('todo-list') as string)
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
      <Tags
        tagList={tagList}
        setTagList={setTagList}
        setFilter={setFilter}
        filter={filter}
      />
      <Search setKeyword={setKeyword} keyword={keyword} />
      <Todo
        tagList={tagList}
        setTagList={setTagList}
        filter={filter}
        keyword={keyword}
      />
    </div>
  ));
};

export default React.memo(MainPage);
