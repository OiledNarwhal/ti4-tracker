import './NavigationMenu.css';
function NavigationMenu(props)
{
    return (
        <div className="navigationmenu">
            <button onClick={props.gamesPageHandler}>Games</button>
            <button onClick={props.statsPageHandler}>Statistics</button>
        </div>
    );
}

export default NavigationMenu;