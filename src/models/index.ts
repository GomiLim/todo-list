export interface alertMessageInterface {
  message: string | JSX.Element | JSX.Element[];
  type?: 'info' | 'confirm';
  completeEvent?: () => void;
  cancelEvent?: () => void;
}
