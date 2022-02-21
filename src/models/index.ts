export interface TagItemInterface {
  id: string;
  tagIcoColor: string;
  text: string;
}

export interface TodoListInterface {
  id: string;
  title: string;
  content: string;
  tagList: TagItemInterface[];
  isComplete: boolean;
}
