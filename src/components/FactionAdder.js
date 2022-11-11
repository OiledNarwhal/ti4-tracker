import { useState } from "react";
import FactionList from "./FactionList";
function FactionAdder(props) {

    const [input, setInput] = useState("");
    
    function addClickHandler(item)
    {
        props.addElementFunction(item);
        console.log("item:" + item);
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
            <FactionList chosenFactions={[]} typed={input} onClickFunc={addClickHandler}/>
        </div>
    )
}

export default FactionAdder;