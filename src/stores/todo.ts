import { observable } from 'mobx';
import { TagItemInterface } from 'models';

export interface TodoData {
  id: string;
  title: string;
  content: string;
  tagList: TagItemInterface[];
  isComplete: boolean;
}

interface Todo {
  todoData: TodoData[];
  initTodo: () => void;
  addTodo: (content: TodoData) => void;
  editTodo: (content: TodoData) => void;
  removeTodo: (id: string) => void;
}

export const todo = observable<Todo>({
  todoData: [],
  initTodo() {
    this.todoData = localStorage.getItem('todo-list')
      ? JSON.parse(localStorage.getItem('todo-list') as string)
      : [];
  },
  addTodo(content) {
    this.todoData.push({
      ...content,
      id: String(Date.now()),
      isComplete: false
    });
  },
  removeTodo(id) {
    const index = this.todoData.findIndex(v => v.id === id);
    if (index !== -1) {
      this.todoData.splice(index, 1);
    }
  },
  editTodo(content) {
    const index = this.todoData.findIndex(v => v.id === content.id);
    if (index !== -1) {
      this.todoData.splice(index, 1, content);
    }
  }
});
