import { useState } from "react"

function ArrayAdder(props) {
    
    const [input, setInput] = useState("");
    
    function addClickHandler(event)
    {
        event.preventDefault();
        props.addElementFunction(input);
        setInput("");
    }

    function inputChangeHandler(event)
    {
        setInput(event.target.value);
    }
    return (
        <div>
            <label>{props.title}</label>
            <input type="text" onChange={inputChangeHandler} value={input}></input>
            <button onClick={addClickHandler}>Add</button>
        </div>
    )
}

export default ArrayAdder