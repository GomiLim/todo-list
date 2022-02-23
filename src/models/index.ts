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

export interface alertMessageInterface {
  message: string | JSX.Element | JSX.Element[];
  type?: 'info' | 'confirm';
  completeEvent?: () => void;
  cancelEvent?: () => void;
}
