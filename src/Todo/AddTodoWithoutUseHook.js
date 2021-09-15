import React, {useState} from "react";
import PropTypes from 'prop-types';

function AddTodo({onCreate}) {
    const [value, setValue] = useState("")

    function submitHandler(event) {
        event.preventDefault();

        if (value.trim()) {
            onCreate(value);
            setValue("");
        }
    }

    return (
        <form style={{marginBottom: "1rem"}} onSubmit={submitHandler}>
            <input value={value} type="text" onChange={event => setValue(event.target.value)} />
            &nbsp;
            <button type="submit">Add todo</button>
        </form>
    )
}

AddTodo.protoTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;