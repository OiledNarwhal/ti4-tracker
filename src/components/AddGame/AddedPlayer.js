import { useState, useEffect } from "react";
import './AddedPlayer.css'

/*
Props:
    playerName
    factionList
*/
function AddedPlayer(props) {

    const [playerInfo, setPlayerInfo] = useState({name: props.playerName, faction: props.faction});

    function factionChangeHandler(event)
    {
        //setPlayerInfo({...playerInfo, faction: event.target.value});
        setPlayerInfo((prevPlayer) => {
            return ({name: prevPlayer.name, faction: event.target.value})
        });
    }

    function removePlayerHandler(){
        props.removePlayerHandler(playerInfo.name);
    }

    function victorChangeHandler() {
        props.victorSelectHandler(playerInfo.name);
    }
    const factionList = ["Federation of Sol", "The Arborec", "The Barony of Letnev"];

    useEffect(() => {
        if(playerInfo.faction !== undefined)
        {
            props.changePlayerFactionHandler(playerInfo);
        }
    }, [props, playerInfo]);
    return (
        <div className="addedplayer">
            <label style={{color: props.victor === playerInfo.name ? 'gold' : 'white'}}>{props.playerName}</label>
            <div>
                <select name="faction" id="faction-select" onChange={factionChangeHandler} value={playerInfo.faction}>
                    {factionList.map((item) => {
                        return <option key={Math.random()} value={item}>{item}</option>
                    })}
                </select>
                <button onClick={victorChangeHandler}>Victor</button>
                <button onClick={removePlayerHandler}>X</button>
            </div>
        </div>
    );
}

export default AddedPlayer;