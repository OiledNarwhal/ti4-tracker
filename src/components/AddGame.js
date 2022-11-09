import './AddGame.css';
import { useState } from 'react';
import ArrayAdder from './ArrayAdder';
import ElementButton from './ElementButton';
import FactionAdder from './FactionAdder';
import AddedPlayer from './AddGame/AddedPlayer';

function AddGame(props) {
    //States for input fields
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [victor, setVictor] = useState();
    const [pointCount, setPointCount] = useState();
    const [gameDate, setGameDate] = useState();
    const [factions, setFactions] = useState([]);
    const [players, setPlayers] = useState([]);

    //input field state changes
    function titleChangeHandler(event) {
        setTitle(event.target.value);
    }
    function victorChangeHandler(victor) {
        setVictor(victor);
    }
    function pointCountChangeHandler(event) {
        setPointCount(event.target.value);
        console.log(event.target.value);
    }
    function dateChangeHandler(event) {
        console.log(event.target.value);
        setGameDate(event.target.value);
    }
    function progressHandler() {
        setProgress(progress + 1);
    }
    function reduceProgressHandler() {
        setProgress(progress - 1);
    }
    function addPlayer(player) {
        setPlayers([...players, {name: player, faction: undefined}]);
        console.log(player);
    }
    function changePlayerFactionHandler(playerInfo)
    {
        let oldPlayers = players;
        let index = oldPlayers.findIndex((item) => {
            return item.name === playerInfo.name;
        })
        oldPlayers[index].faction = playerInfo.faction;
        setPlayers(oldPlayers);
    }
    function removePlayer(playerName) {
        let index = players.findIndex((item) => {
            return item.name === playerName;
        });
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
        if(players.length === 0)
        {
            console.log("Bad input");
            return;
        }
        let newGame = {
            title: title,
            date: gameDate,
            victor: victor,
            pointCount: pointCount,
            players: players,
        }
        console.log(newGame);
        props.submitHandler(newGame);
        setTitle("");
        setVictor("");
        setPointCount(undefined);
        setPlayers([]);
        props.closeHandler();
    }
    let playerList = '';
    players.forEach(item => {
        playerList = playerList + item + ', ';
    });

    let factionList = '';
    factions.forEach(item => {
        factionList = factionList + item + ', ';
    });
    let keyId = 0;
    return (
        <div>
            <div className="addgame__backdrop" onClick={props.closeHandler}/>
            <div className="addgame__modal">
                <button className="addgame__closeButton" onClick={props.closeHandler}>Close</button>
                <header className="addgame__header">
                    <h2>Add Game</h2>
                </header>
                {progress === 0 && <div className="addgame__content">
                    <p>Please Enter the Game's Information, then hit "Next". </p>
                    <form>
                        <div className="addgame__formsection">
                            <label>Game Title:</label>
                            <input type="text" name="title" value={title} onChange={titleChangeHandler}/>
                        </div>
                        <div className="addgame__formsection" onChange={pointCountChangeHandler}>
                            <label>Point Count:</label>
                            <input type="radio" name="pointCount" id="10" value="10"/> <label style={{paddingLeft: "0rem"}} htmlFor="10">10</label>
                            <input type="radio" name="pointCount" id="12" value="12"/> <label style={{paddingLeft: "0rem"}} htmlFor="12">12</label>
                            <input type="radio" name="pointCount" id="14" value="14"/> <label style={{paddingLeft: "0rem"}} htmlFor="14">14</label>
                        </div>
                        <div className="addgame__formsection">
                            <label>Game Date:</label>
                            <input type="date" name="date" onChange={dateChangeHandler}/>
                        </div>
                    </form>
                </div>}
                {progress === 1 && <div className="addgame__content">
                    <p>Please add players and assign them a faction.</p>
                    <div className="addgame__formsection">
                        <ArrayAdder title={"Player:"} addElementFunction={addPlayer}/>
                    </div>
                    {players.map((item) => {
                        return(
                            <div key={Math.random()} className="addgame__formSection">
                                <AddedPlayer key={keyId++} playerName={item.name} faction={item.faction} changePlayerFactionHandler={changePlayerFactionHandler} removePlayerHandler={removePlayer} victorSelectHandler={victorChangeHandler} victor={victor} factionList={props.factionList}/>
                            </div>
                        );
                    })}
                        
                </div>}
                {progress === 2 && <div className="addgame__content">
                    <p>Review and Submit!</p>
                    <div className="addgame__review">
                        <label>Title: {title}</label>
                        <label>Point Count: {pointCount}</label>
                        <label>Date: {gameDate}</label>
                        <label>Players: </label>
                        {players.map((item) => {
                            return (<label key={Math.random()} style={{paddingLeft: '3rem', color: victor === item.name ? 'gold' : 'white'}}>{item.name} - {item.faction}</label>)
                        })}
                    </div>
                </div>}
                <footer style={{justifyContent: progress > 0 ? "space-between" : "flex-end"}}className="addgame__footer">
                    {progress > 0 && <button onClick={reduceProgressHandler}>Back</button>}
                    {progress < 2 && <button onClick={progressHandler}>Next</button>}
                    {progress === 2 && <button onClick={submitHandler}>Submit</button>}
                </footer>
            </div>
        </div>
    );
    /* Previous Implementation
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
    */

}

export default AddGame;