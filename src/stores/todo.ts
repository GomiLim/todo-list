import { findSameItem } from 'libs/utill';
import { observable } from 'mobx';
import { TagItemInterface } from 'models';
import { TagData } from './filter';

export interface TodoData {
  id: string;
  title: string;
  content: string;
  tagList: TagItemInterface[];
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
    const updateTodoData = this.todoData.filter(prevTodo => {
      if (prevTodo.id === id) {
        return { ...prevTodo, isComplete: checkd };
      }
    });
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
    this.todoData = [...updateTodoData];
  },
  updateTodoListOnTagChange(todoList, tagList) {
    const reflectingTagChange = todoList.map((todo: TodoData) => {
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
  }
});
