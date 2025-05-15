import { Link } from 'react-router';
import { TodoModel } from '../../types';
import styles from './todoItem.module.scss';

interface TodoItemProps {
  todo: TodoModel;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className={styles.item}>
      <Link to={`/task/${todo.id}`}>
        <div className={styles.text}>{todo.title}</div>
      </Link>
    </div>
  );
};

export default TodoItem;
