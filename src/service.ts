import { TodoModel } from './types';

const baseUrl = 'http://localhost:3000/todos';

export const todoApi = {
  getTodos: async (): Promise<TodoModel[]> => {
    const response = await fetch(baseUrl);
    if (!response.ok) throw new Error('Todos request error');
    const todos: TodoModel[] = await response.json();
    return todos;
  },
  updateTodo: async (data: TodoModel): Promise<TodoModel> => {
    const response = await fetch(`${baseUrl}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Todo update request error');
    const updatedTodo: TodoModel = await response.json();
    return updatedTodo;
  },
  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Todo delete request error');
    await response.json();
  },
  addTodo: async (data: Omit<TodoModel, 'id'>): Promise<TodoModel> => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Todo add request error');
    const newTodo: TodoModel = await response.json();
    return newTodo;
  },
  searchTodos: async (text: string): Promise<TodoModel[]> => {
    const response = await fetch(`${baseUrl}?title_like=${text}`);
    if (!response.ok) throw new Error('Todo search request error');
    const todos: TodoModel[] = await response.json();
    return todos;
  },
  getTodo: async (id: number): Promise<TodoModel> => {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) throw new Error('Todo request error');
    const todo = response.json();
    return todo;
  },
};
