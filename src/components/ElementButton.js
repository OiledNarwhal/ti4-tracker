function ElementButton(props) {

    function buttonClickHandler(event)
    {
        //console.log('clicked');
        event.preventDefault();
        props.onClickHandler(props.title);
    }
    return (
        <button onClick={buttonClickHandler}>{props.title}</button>
    )
}

export default ElementButton;