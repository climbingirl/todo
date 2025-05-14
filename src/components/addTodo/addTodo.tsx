import { Dispatch, FormEvent, useState } from 'react';
import styles from './addTodo.module.scss';
import { useRequestAddTodo } from '../../hooks';
import { TodoModel } from '../../types';

interface AddTodoProps {
  setTodos: Dispatch<React.SetStateAction<TodoModel[]>>;
}

const AddTodo = ({ setTodos }: AddTodoProps) => {
  const [title, setTitle] = useState('');
  const { isCreating, requestAddTodo } = useRequestAddTodo(setTodos);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length) {
      requestAddTodo({ title });
      setTitle('');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <button type="submit" disabled={isCreating}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
