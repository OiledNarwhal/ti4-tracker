import { useState } from 'react';
import './NavigationMenu.css';
function NavigationMenu(props)
{
    const [gamesBackground, setGamesBackground] = useState(props.currPage === 'games' ? '#034682' : '#00549E');
    const [statsBackground, setStatsBackground] = useState(props.currPage === 'stats' ? '#034682' : '#00549E');
    function gamesEnterHandler() {
        setGamesBackground('#057ae3');
    }
    function gamesLeaveHandler() {
        setGamesBackground(props.currPage === 'games' ? '#034682' : '#00549E');
    }

    function statsEnterHandler() {
        setStatsBackground('#057ae3');
    }
    function statsLeaveHandler() {
        setStatsBackground(props.currPage === 'stats' ? '#034682' : '#00549E');
    }
    function gamesClickHandler() {
        setGamesBackground('#034682');
        setStatsBackground('#00549E');
        props.gamesPageHandler()
    }
    function statsClickHandler() {
        setGamesBackground('#00549E');
        setStatsBackground('#034682');
        props.statsPageHandler()
    }
    
    return (
        <div className="navigationmenu">
            <button style={{backgroundColor: gamesBackground}} onClick={gamesClickHandler} onMouseEnter={gamesEnterHandler} onMouseLeave={gamesLeaveHandler}>Games</button>
            <button style={{backgroundColor: statsBackground}} onClick={statsClickHandler} onMouseEnter={statsEnterHandler} onMouseLeave={statsLeaveHandler}>Statistics</button>
        </div>
    );
}

export default NavigationMenu;