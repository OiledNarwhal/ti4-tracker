import './AddGame.css';
import { useState } from 'react';
import ArrayAdder from './ArrayAdder';
import ElementButton from './ElementButton';
import FactionAdder from './FactionAdder';

function AddGame(props) {
    //States for input fields
    const [title, setTitle] = useState();
    const [victor, setVictor] = useState();
    const [pointCount, setPointCount] = useState();
    const [factions, setFactions] = useState([]);
    const [players, setPlayers] = useState([]);

    //input field state changes
    function titleChangeHander(event) {
        setTitle(event.target.value);
    }
    function victorChangeHander(event) {
        setVictor(event.target.value);
    }
    function pointCountChangeHander(event) {
        setPointCount(event.target.value);
    }
    function addPlayer(player) {
        setPlayers([...players, player]);
    }
    function removePlayer(player) {
        let index = players.indexOf(player);
        console.log(index);
        let dummyArray = players;
        dummyArray.splice(index, 1)
        setPlayers([...dummyArray]);
    }

    function addFaction(faction) {
        setFactions([...factions, faction]);
    }
    function removeFaction(faction) {
        let index = factions.indexOf(faction);
        console.log(index);
        let dummyArray = factions;
        dummyArray.splice(index, 1)
        setFactions([...dummyArray]);
    }


    function submitHandler(event){
        event.preventDefault();
        let newGame = {
            title: title,
            victor: victor,
            pointCount: pointCount,
            factions: factions,
            players: players,
        }
        props.submitHandler(newGame);
        setTitle("");
        setVictor("");
        setPointCount(undefined);
        setPlayers([]);
        setFactions([]);
    }
    let playerList = '';
    players.forEach(item => {
        playerList = playerList + item + ', ';
    });

    let factionList = '';
    factions.forEach(item => {
        factionList = factionList + item + ', ';
    });
    return (
        <div className="addgame__popout">
            <form>
                <label>Title</label>
                <input type="text" value={title} onChange={titleChangeHander}/>
                <label>Victor</label>
                <input type="text" value={victor} onChange={victorChangeHander}/>
                <label>Point Count</label>
                <input type="number" value={pointCount} onChange={pointCountChangeHander}/>
                {players.map(item => {
                    return <ElementButton key={Math.random()} onClickHandler={removePlayer} title={item}/>
                })}
                <ArrayAdder title='Players' addElementFunction={addPlayer}/>
                {factions.map(item => {
                    return <ElementButton key={Math.random()} onClickHandler={removeFaction} title={item}/>
                })}
                <FactionAdder title='Factions' addElementFunction={addFaction}/>
            </form>
            <button type="submit" onClick={submitHandler}>Submit</button>
            <button onClick={props.closeHandler}>Close</button>

        </div>
    );

}

export default AddGame;