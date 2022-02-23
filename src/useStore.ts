import { todo } from 'stores/todo';
import { filter } from 'stores/filter';

const useStore = () => ({ todo, filter });

export default useStore;
