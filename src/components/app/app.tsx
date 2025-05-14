import styles from './app.module.scss';
import TodoItem from '../todoItem/todoItem';
import Loader from '../loader/loader';
import { useDebouncedRequestSearchTodo, useRequestGetTodos } from '../../hooks';
import AddTodo from '../addTodo/addTodo';
import { useState } from 'react';
import Search from '../search/search';

const App = () => {
  const { todos, setTodos, isLoading } = useRequestGetTodos();
  const { isSearching, requestSearchTodos } = useDebouncedRequestSearchTodo(setTodos);
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const sortedTodos = isSortedAsc
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : todos;

  return (
    <div className={styles.container}>
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
            <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </div>
      ) : (
        <div className={styles['empty-list']}>You have no tasks</div>
      )}
    </div>
  );
};

export default App;
