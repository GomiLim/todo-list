export interface PropsTagItem {
  id: string;
  tagIcoColor: string;
  text: string;
}
export interface PropsTagList {
  tagList: PropsTagItem[];
}

export interface TodoListInterface {
  id: string;
  title: string;
  content: string | JSX.Element | JSX.Element[];
  tagList: PropsTagItem[];
  isComplete: boolean;
}
