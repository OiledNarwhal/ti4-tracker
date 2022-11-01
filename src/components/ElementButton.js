function ElementButton(props) {

    function buttonClickHandler(event)
    {
        event.preventDefault();
        props.onClickHandler(props.title);
    }
    return (
        <button onClick={buttonClickHandler}>{props.title}</button>
    )
}

export default ElementButton;