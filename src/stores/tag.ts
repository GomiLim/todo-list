import { observable } from 'mobx';
import { todo } from './todo';

export interface TagData {
  id: string;
  tagIcoColor: string;
  text: string;
}

interface Tag {
  tagData: TagData[];
  initTags: (content: TagData[]) => void;
  addTag: (content: TagData) => void;
  removeTag: (id: string) => void;
  editTag: (content: TagData) => void;
}

export const tag = observable<Tag>({
  tagData: [],
  initTags(content) {
    this.tagData = [...content];
  },
  addTag(content) {
    this.tagData.push({
      ...content,
      id: String(Date.now())
    });
    localStorage.setItem('tag-list', JSON.stringify(tag.tagData));
  },
  removeTag(id) {
    const index = this.tagData.findIndex(prevTag => prevTag.id === id);
    if (index !== -1) {
      this.tagData.splice(index, 1);
    }
    todo.updateTodoListOnTagChange(todo.todoData, tag.tagData);
    localStorage.setItem('tag-list', JSON.stringify(tag.tagData));
  },
  editTag(content) {
    const index = this.tagData.findIndex(prevTag => prevTag.id === content.id);
    if (index !== -1) {
      this.tagData.splice(index, 1, content);
    }
    todo.updateTodoListOnTagChange(todo.todoData, tag.tagData);
    localStorage.setItem('tag-list', JSON.stringify(tag.tagData));
  }
});
