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
  const [isSort, setIsSort] = useState(false);
  const displayTodos = isSort
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : todos;

  return (
    <div className={styles.container}>
      <Search requestSearchTodos={requestSearchTodos} />
      <h1 className={styles.header}>TODO LIST</h1>
      <div className={styles['tool-bar']}>
        <AddTodo setTodos={setTodos} />
        <button onClick={() => setIsSort((prev) => !prev)}>
          {isSort ? 'ASC ▼' : 'ASC ▲'}
        </button>
      </div>
      {isLoading || isSearching ? (
        <Loader />
      ) : (
        <div className={styles['todo-list']}>
          {displayTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
