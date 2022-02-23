import { observable } from 'mobx';

export interface TagData {
  id: string;
  tagIcoColor: string;
  text: string;
}

interface Todo {
  activeFilter: TagData[];
  initFilter: (tags: TagData[]) => void;
  addFilter: (tag: TagData) => void;
  removeFilter: (id: string) => void;
  editFilter: (id: string) => void;
  updateFilter: (tagList: TagData[], updateTagList: TagData[]) => void;
}

export const filter = observable<Todo>({
  activeFilter: [],
  initFilter(tags) {
    this.activeFilter = [...tags];
  },
  addFilter(tag) {
    this.activeFilter.push({ ...tag });
    localStorage.setItem('tag-filter', JSON.stringify(filter.activeFilter));
  },
  removeFilter(id) {
    const index = this.activeFilter.findIndex(prevTodo => prevTodo.id === id);
    if (index !== -1) {
      this.activeFilter.splice(index, 1);
    }
    localStorage.setItem('tag-filter', JSON.stringify(filter.activeFilter));
  },
  editFilter(id) {
    const index = this.activeFilter.findIndex(prevTodo => prevTodo.id === id);
    if (index !== -1) {
      this.activeFilter.splice(index, 1);
    }
    localStorage.setItem('tag-filter', JSON.stringify(filter.activeFilter));
  },
  updateFilter(tagList, updateTagList) {
    const reflectingTagChange = tagList.filter((filter: TagData) =>
      updateTagList.find((item: TagData) => item.id === filter.id)
    );
    this.activeFilter = [...reflectingTagChange];
    localStorage.setItem('tag-filter', JSON.stringify(filter.activeFilter));
  }
});
