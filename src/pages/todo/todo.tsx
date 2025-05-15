import { useState } from 'react';
import {
  useRequestUpdateTodos,
  useRequestDeleteTodo,
  useRequestGetTodo,
} from '../../hooks';
import styles from './todo.module.scss';
import { useNavigate, useParams } from 'react-router';
import { TodoModel } from '../../types';
import Loader from '../../components/loader/loader';

interface TaskProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}

const Todo = ({ setTodos }: TaskProps) => {
  const { id } = useParams();
  const taskId = Number(id);
  const navigate = useNavigate();
  const { todo, setTodo, isLoading } = useRequestGetTodo(taskId);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { isUpdating, requestUpdateTodo } = useRequestUpdateTodos(setTodos);
  const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(setTodos);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {
      setTodo({ ...todo, title: e.target.value });
    }
  };

  const handleSaveTodo = () => {
    if (todo) {
      setIsEdit(false);
      requestUpdateTodo(todo);
    }
  };

  const handleDeleteTodo = () => {
    if (id) {
      requestDeleteTodo(taskId);
      setIsDeleted(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!todo || isDeleted) {
    return (
      <>
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <p>{isDeleted ? 'Task is deleted' : 'Task not found'}</p>
      </>
    );
  }

  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className={styles.content}>
        {isEdit ? (
          <input
            className={styles.input}
            type="text"
            value={todo?.title}
            onChange={handleTitleChange}
          />
        ) : (
          <div className={styles.text}>{todo?.title}</div>
        )}
      </div>
      <div className={styles.controls}>
        {isEdit ? (
          <button
            type="button"
            onClick={handleSaveTodo}
            disabled={isUpdating || !todo?.title.trim().length}
          >
            Save
          </button>
        ) : (
          <button type="button" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        )}
        <button type="button" onClick={handleDeleteTodo} disabled={isDeleting}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Todo;
