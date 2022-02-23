import { observable, toJS } from 'mobx';
import { findSameItem } from 'libs/utill';
import { TagData } from './tag';

export interface TodoData {
  id: string;
  title: string;
  content: string;
  tagList: TagData[];
  isComplete: boolean;
}

interface Todo {
  todoData: TodoData[];
  filterTodoData: TodoData[];
  initTodo: (content: TodoData[]) => void;
  addTodo: (content: TodoData) => void;
  editTodo: (content: TodoData) => void;
  removeTodo: (id: string) => void;
  changeIsComplete: (id: string, checkd: boolean) => void;
  updateTodoListOnTagChange: (todoList: TodoData[], tagList: TagData[]) => void;
}

export const todo = observable<Todo>({
  todoData: [],
  filterTodoData: [],
  initTodo(content) {
    this.todoData = [...content];
  },
  addTodo(content) {
    this.todoData.push({
      ...content,
      id: String(Date.now()),
      isComplete: false
    });
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  },
  removeTodo(id) {
    const index = this.todoData.findIndex(prevTodo => prevTodo.id === id);
    if (index !== -1) {
      this.todoData.splice(index, 1);
    }
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  },
  editTodo(content) {
    const index = this.todoData.findIndex(
      prevTodo => prevTodo.id === content.id
    );
    if (index !== -1) {
      this.todoData.splice(index, 1, content);
    }
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  },
  changeIsComplete(id, checkd) {
    const updateTodoData = this.todoData.map(prevTodo => {
      if (prevTodo.id === id) {
        return { ...prevTodo, isComplete: checkd };
      } else {
        return prevTodo;
      }
    });

    const index = this.todoData.findIndex(prevTodo => prevTodo.id === id);
    const updateCheck = { ...this.todoData };

    if (index !== -1) {
      updateCheck[index].isComplete = checkd;
    }

    this.todoData = [...updateTodoData];
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  },
  updateTodoListOnTagChange(todoList, tagList) {
    const updatedTodoList = todoList.map((todoItem: TodoData) => {
      const updatedTodoTagList = todoItem.tagList
        .map((tagItem: TagData) => {
          const tagIndex = findSameItem(tagList, 'id', tagItem.id);
          const newTagItem = { ...tagItem };
          if (tagIndex !== -1) {
            newTagItem.text = tagList[tagIndex].text;
            return newTagItem;
          }
          newTagItem.id = '-1';
          return newTagItem;
        })
        .filter((tagItem: TagData) => tagItem.id !== '-1');
      return { ...todoItem, tagList: updatedTodoTagList };
    });
    this.todoData = updatedTodoList;
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  }
});
