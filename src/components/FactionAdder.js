import { useState } from "react";
import FactionList from "./FactionList";
function FactionAdder(props) {

    const [input, setInput] = useState("");
    const [focus, setFocus] = useState(false);
    
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
    function handleFocus()
    {
        setFocus(true);
    }
    function handleBlur(event)
    {
        if(document.activeElement !== document.getElementById("popup-faction-list"))
        {
            setFocus(false);
        }
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