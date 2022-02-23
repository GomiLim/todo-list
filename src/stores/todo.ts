import { observable } from 'mobx';
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
  completeCount: number;
  initTodo: (content: TodoData[]) => void;
  addTodo: (content: TodoData) => void;
  editTodo: (content: TodoData) => void;
  removeTodo: (id: string) => void;
  changeIsComplete: (id: string, checkd: boolean) => void;
  filterTodo: (content: TodoData[]) => void;
  updateTodoListOnTagChange: (todoList: TodoData[], tagList: TagData[]) => void;
  getCompleteCount: () => void;
}

export const todo = observable<Todo>({
  todoData: [],
  filterTodoData: [],
  completeCount: 0,
  initTodo(content) {
    this.todoData = [...content];
    todo.getCompleteCount();
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
    todo.getCompleteCount();
    localStorage.setItem('todo-list', JSON.stringify(todo.todoData));
  },
  filterTodo(content) {
    this.filterTodoData = content;
    localStorage.setItem('filter-list', JSON.stringify(todo.todoData));
  },
  updateTodoListOnTagChange(todoList, tagList) {
    /**
     * 태그의 업데이트 (태그명 수정 / 태그 삭제) 에 따른 기존 TODO아이템의 Tag들을 업데이트 해주는 기능합니다.
     * 수정시 : 각 Todo의 tagList를 확인하며, 바뀐내용이 있는 태그를 업데이트해줍니다.
     * 삭제시 : 각 Todo에 있는 삭제 된 태그를 제거합니다.
     */
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
  },
  getCompleteCount() {
    this.completeCount = this.todoData.filter(
      (item: TodoData) => item.isComplete
    ).length;
  }
});
