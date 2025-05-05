import { useEffect, useState } from 'react';
import styles from './app.module.scss';
import { NoteModel } from '../../types';
import Note from '../note/note';
import Loader from '../loader/loader';

const App = () => {
  const [todos, setTodos] = useState<NoteModel[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const notes: NoteModel[] = await response.json();
        setTodos(notes);
      } catch (error) {
        console.error('Loading data:', error);
      }
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>TODO LIST</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['note-list']}>
          {todos.map((todo) => (
            <Note key={todo.id} {...todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
