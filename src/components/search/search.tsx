import { ChangeEvent, useState } from 'react';
import styles from './search.module.scss';

interface AddTodoProps {
  requestSearchTodos: (text: string) => void;
}

const Search = ({ requestSearchTodos }: AddTodoProps) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    requestSearchTodos(newValue);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Search tasks"
      />
    </div>
  );
};

export default Search;
