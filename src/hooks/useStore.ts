import { todo } from 'stores/todo';
import { filter } from 'stores/filter';
import { tag } from 'stores/tag';

const useStore = () => ({ todo, filter, tag });

export default useStore;
