import React, { useState, useEffect } from "react";
import './App.css';
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

function App() {
    let [todos, setTodos] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos);
                    setLoading(false);
                }, 2000)
            })
    }, []);

    function toggleTodo(id) {
        setTodos(
            todos.map(todo => {
            if(id === todo.id) {
                todo.completed = !todo.completed;
            }
            return todo;
            })
        )
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function createTodo(title) {
        /*todos.push({
            id: Date.now(),
            completed: false,
            title: title
        });*/

        setTodos(
            todos.concat({
                id: Date.now(),
                completed: false,
                title: title
            })

            // здесь должны происходить изменения, возвращающие НОВЫЙ массив! Стейт должен обновиться!

            //todos.slice() - если пушить в изначальный массив, то потов надо применить метод возвращающий НОВЫЙ стейт, т.к. setTodos - функция изменяющая стейт. Иначе изменения не отрендерятся

            /*[...todos, {
                id: Date.now(),
                completed: false,
                title: title
            }] - изменяем стейт, склеивая объекты в НОВЫЙ массив */
        )
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className="wrapper">
              <h1>Todo list</h1>
                <Modal />

                <AddTodo onCreate={createTodo} />
                {(todos.length) ? (
                    <TodoList todos={todos} onToggle={toggleTodo}/>
                ) : (loading) ? <Loader /> : (
                    <p>No todos!</p>
                )}
            </div>
        </Context.Provider>
    );
}

export default App;
