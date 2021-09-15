import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from 'prop-types';

const styles = {
    ul: {
        listStyle: "none",
        margin: 0,
        padding: 0
    }
}

function TodoList(props) {
    return (
        <ul style={styles.ul}>
            {props.todos.map((todo, index) => {
               return <TodoItem
                   key={todo.id}
                   todo={todo}
                   index={index}
                   onToggle={props.onToggle}
               />
            })}
        </ul>
    )
}

TodoList.protoTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TodoList;