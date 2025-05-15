import styles from './mainPage.module.scss';
import { useDebouncedRequestSearchTodo } from '../../hooks';
import { useState } from 'react';
import Search from '../../components/search/search';
import AddTodo from '../../components/addTodo/addTodo';
import Loader from '../../components/loader/loader';
import TodoItem from '../../components/todoItem/todoItem';
import { TodoModel } from '../../types';

interface MainPageProps {
  todos: TodoModel[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
  isLoading: boolean;
}

const MainPage = ({ todos, setTodos, isLoading }: MainPageProps) => {
  const { isSearching, requestSearchTodos } = useDebouncedRequestSearchTodo(setTodos);
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const sortedTodos = isSortedAsc
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : todos;

  return (
    <>
      <Search requestSearchTodos={requestSearchTodos} />
      <h1 className={styles.header}>TODO LIST</h1>
      <div className={styles['tool-bar']}>
        <AddTodo setTodos={setTodos} />
        <button onClick={() => setIsSortedAsc((prev) => !prev)}>
          {isSortedAsc ? 'ASC ▼' : 'ASC ▲'}
        </button>
      </div>
      {isLoading || isSearching ? (
        <Loader />
      ) : sortedTodos.length ? (
        <div className={styles['todo-list']}>
          {sortedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <div className={styles['empty-list']}>You have no tasks</div>
      )}
    </>
  );
};

export default MainPage;
