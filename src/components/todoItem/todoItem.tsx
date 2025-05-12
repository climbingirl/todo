import { Dispatch, useState } from 'react';
import { TodoModel } from '../../types';
import styles from './todoItem.module.scss';
import { useRequestDeleteTodo, useRequestUpdateTodos } from '../../hooks';

interface TodoItemProps {
  todo: TodoModel;
  setTodos: Dispatch<React.SetStateAction<TodoModel[]>>;
}

const TodoItem = ({ todo, setTodos }: TodoItemProps) => {
  const [title, setTitle] = useState(todo.title || '');
  const [isEdit, setIsEdit] = useState(false);
  const { isUpdating, requestUpdateTodo } = useRequestUpdateTodos(setTodos);
  const { isDeleting, requestDeleteTodod } = useRequestDeleteTodo(setTodos);

  const handleSaveTodo = () => {
    setIsEdit(false);
    if (todo.title === title) return;
    requestUpdateTodo({ id: todo.id, title });
  };

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        {isEdit ? (
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className={styles.text}>{todo.title}</div>
        )}
      </div>
      <div className={styles.controls}>
        {isEdit ? (
          <button
            type="button"
            onClick={handleSaveTodo}
            disabled={isUpdating || !title.trim().length}
          >
            Save
          </button>
        ) : (
          <button type="button" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={() => requestDeleteTodod(todo.id)}
          disabled={isDeleting}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
