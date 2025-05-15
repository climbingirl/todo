import { Dispatch, useEffect, useRef, useState } from 'react';
import { TodoModel } from './types';
import { todoApi } from './service';

export const useRequestGetTodos = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const todos = await todoApi.getTodos();
        setTodos(todos);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, setTodos, isLoading };
};

export const useRequestUpdateTodos = (
  setTodos: Dispatch<React.SetStateAction<TodoModel[]>>
) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdateTodo = async (data: TodoModel) => {
    try {
      setIsUpdating(true);
      const updatedTodo = await todoApi.updateTodo(data);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, requestUpdateTodo };
};

export const useRequestDeleteTodo = (
  setTodos: Dispatch<React.SetStateAction<TodoModel[]>>
) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDeleteTodo = async (id: number) => {
    try {
      setIsDeleting(true);
      await todoApi.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, requestDeleteTodo };
};

export const useRequestAddTodo = (
  setTodos: Dispatch<React.SetStateAction<TodoModel[]>>
) => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAddTodo = async (data: Omit<TodoModel, 'id'>) => {
    try {
      setIsCreating(true);
      const newTodo = await todoApi.addTodo(data);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return { isCreating, requestAddTodo };
};

export const useDebouncedRequestSearchTodo = (
  setTodos: Dispatch<React.SetStateAction<TodoModel[]>>
) => {
  const [isSearching, setIsSearching] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const requestSearchTodos = (text: string) => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        const todos = await todoApi.searchTodos(text);
        setTodos(todos);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 1500);
  };

  return { isSearching, requestSearchTodos };
};

export const useRequestGetTodo = (id: number) => {
  const [todo, setTodo] = useState<TodoModel>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true);
        const todo = await todoApi.getTodo(id);
        setTodo(todo);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  return { todo, setTodo, isLoading };
};
