import './AddGame.css';
import { useState } from 'react';
import ArrayAdder from './ArrayAdder';
import AddedPlayer from './AddGame/AddedPlayer';

function AddGame(props) {
    //States for input fields
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [victor, setVictor] = useState("");
    const [pointCount, setPointCount] = useState(undefined);
    const [gameDate, setGameDate] = useState(undefined);
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
    //Make sure input is good before moving to the next step.
    function progressHandler() {
        //First step input check.
        if(progress === 0)
        {
            if(title.length === 0)
            {
                //Bad input.
                alert("Please enter a Game Title before proceeding.");
                return;
            }
            else if(pointCount === undefined)
            {
                alert("Please enter a Point Count before proceeding.");
                return;
            }
            else if(gameDate === undefined)
            {
                alert("Please enter a Game Date before proceeding.");
                return;
            }
        }
        //Second step input check.
        else if(progress === 1) {
            if(players.length === 0)
            {
                alert("Please add players before proceeding.");
                return;
            }
            else if((players.findIndex((player) => {
                return (player.faction === undefined || player.faction === '--Please Select a Faction--');
            })) !== -1) {
                alert("Please assign each Player a Faction before proceeding.");
                return;
            }
            else if(victor.length === 0)
            {
                alert("Please select one player as the Victor before proceeding.");
                return;
            }
            else {
                let factionDupe = false;
                let indexer = 0;
                players.forEach((player, index) => {
                    indexer = players.findIndex((innerPlayer, innerIndex) => {
                        return (player.faction === innerPlayer.faction && index !== innerIndex);
                    })
                    if(indexer !== -1)
                    {
                        factionDupe = true;
                    }
                });
                if(factionDupe)
                {
                    alert("Please ensure all players are assigned to unique factions before proceeding.");
                    return;
                }
            }
        }
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
        setGameDate(undefined);
        setPointCount(undefined);
        setPlayers([]);
        props.closeHandler();
    }
    let playerList = '';
    players.forEach(item => {
        playerList = playerList + item + ', ';
    });
    let keyId = 0;
    let factionIcons = [];
    players.forEach((player) => {
        if(player.faction !== undefined) {
            factionIcons.push(require(`../factionImages/VectorIcons/${player.faction}.png`));
        }
    })
    return (
        <div>
            <div className="addgame__backdrop" onClick={props.closeHandler}/>
            <div className="addgame__modal">
                <div className="addgame__top">
                    <header className="addgame__header">
                        <h2>Add Game {`(Step ${progress + 1} of 3)`}</h2>
                    </header>
                    <div className="addgame__closeButton">
                        <button onClick={props.closeHandler}>Close</button>
                    </div>
                </div>
                {progress === 0 && <div className="addgame__content">
                    <p>Please Enter the Game's Information, then click "Next." </p>
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
                    <p>Please add players and assign them a faction. Then click "Next."</p>
                    <div className="addgame__formsection">
                        <ArrayAdder title={"Player:"} addElementFunction={addPlayer}/>
                    </div>
                    {players.map((item) => {
                        return(
                            <div key={Math.random()} className="addgame__players">
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
                        <div className="addgame_reviewPlayers">
                        {players.map((item, index) => {
                            return (
                            <div className="addgame__reviewPlayersContainer">
                                <label key={Math.random()} style={{paddingLeft: '5vw', color: victor === item.name ? 'gold' : 'white'}}>{item.name} - {item.faction}</label>
                                <img key={`player icon ${index}`} src={factionIcons[index]} className="addgame__reviewImage" alt="An icon for the player's faction"/>
                            </div>)
                        })}
                        </div>
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