import CardOrganizer from "./CardOrganizer";
import NavigationMenu from "./NavigationMenu";
import AddGame from "./AddGame";
import { useState, useEffect } from "react";
import TitleBar from "./TitleBar";
import StatisticsPage from "./Statistics/StatisticsPage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import './MainPage.css';

function MainPage() {

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyD5B0nhJ1u-Lfy7M7aNIqiogBRiTdwyxOc",
        authDomain: "ti4-tracker-55076.firebaseapp.com",
        projectId: "ti4-tracker-55076",
        storageBucket: "ti4-tracker-55076.appspot.com",
        messagingSenderId: "373212123784",
        appId: "1:373212123784:web:569cef55830167a75b053d",
        measurementId: "G-0JTX4QGFY8",
        databaseURL: "https://ti4-tracker-55076-default-rtdb.firebaseio.com/",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);

    const testRef = ref(database);

    async function populateData()
    {
        
        //Get Game data to display
        await get(child(testRef, 'games')).then((snapshot) => {
            let cards = [];
            if(snapshot.exists()) {
                for(const game in snapshot.val())
                {
                    cards.push(snapshot.val()[game]);
                };
            }
            else {
                console.log('No game data available');
            }
            setGameList(cards);
        }).catch((error => {
            console.error(error);
        }))

        //Get our predefined list of factions
        await get(child(testRef, 'factionList')).then((snapshot) => {
            let pulledFactions = [];
            if(snapshot.exists()) {
                pulledFactions = snapshot.val();
            }
            else {
                console.log('No faction data');
            }
            setFactionList(pulledFactions);
        }).catch((error) => {
            console.log(error);
        })

        //Get our Player statistics
        await get(child(testRef, 'players')).then((snapshot) => {
            if(snapshot.exists()) {
                setPlayerStats(snapshot.val());
            }
            else {
                console.log('No player statistics data available');
            }
        }).catch((error => {
            console.error(error);
        }))
        console.log('here');

        //Get our Factions statistics
        await get(child(testRef, 'factions')).then((snapshot) => {
            let factions = [];
            if(snapshot.exists()) {
                for(const faction in snapshot.val())
                {
                    factions.push(snapshot.val()[faction]);
                };
            }
            else {
                console.log('No faction statistics data available');
            }
            setFactionStats(factions);
        }).catch((error => {
            console.error(error);
        }))

    }
    /*
    get(child(testRef, 'games')).then((snapshot) => {
        if(snapshot.exists()) {
            for(const game in snapshot.val())
            {
                console.log(snapshot.val()[game]);
            };
            //await cards = Object.entries(snapshot.val());
        }
        else {
            console.log('No data available');
        }
    }).catch((error => {
        console.error(error);
    }))*/
    /*
    const testRef = ref(database, 'test');
    onValue(testRef, (snapshot) => { 
        console.log("here");
        const data = snapshot.val();
        testDBReading(data);
    })
    */

    const [addingGame, setAddingGame] = useState(false);
    const [factionList, setFactionList] = useState(false);
    const [gameList, setGameList] = useState(undefined);
    const [currPage, setCurrPage] = useState("games");
    const [playerStats, setPlayerStats] = useState(undefined);
    const [factionStats, setFactionStats] = useState(undefined);
    useEffect(() => {
        populateData();
    }, []);

    //populateData(testRef);

    function addGameButtonHandler() {
        setAddingGame(true);
    }
    function closeAddGameHandler() {
        setAddingGame(false);
    }
    function gamePage() {
        setCurrPage("games");
    }
    function statsPage() {
        setCurrPage("stats");
    }

    function addGameSubmitHandler(game) {
        
        //Add the new game
        set(ref(database, 'games/game' + gameList.length), game);
        
        //Update player information
        game.players.forEach((item) => {
            get(child(testRef, 'players/' + item.name)).then((snapshot) => { 
                if(snapshot.exists()) {
                    //Update info for the player. Will need to check factions played.
                    let updatedPlayer = snapshot.val();
                    updatedPlayer.gamesPlayed++;
                    updatedPlayer.wins = game.victor === item.name ? updatedPlayer.wins + 1 : updatedPlayer.wins;
                    const factionIndex = updatedPlayer.factionsPlayed.findIndex((dbFaction) => {
                        return dbFaction.name === item.faction;
                    })
                    if(factionIndex > -1) {
                        //We have the faction already in the db.
                        const factionWins = updatedPlayer.factionsPlayed[factionIndex].wins;
                        updatedPlayer.factionsPlayed[factionIndex].plays++;
                        updatedPlayer.factionsPlayed[factionIndex].wins = game.victor === item.name ? factionWins + 1 : factionWins;

                    }
                    else
                    {
                        //we do not have the faction already in the db. Create a new entry.
                        let newFactionEntry = {
                            name: item.faction,
                            plays: 1,
                            wins: game.victor === item.name ? 1 : 0,
                        }
                        updatedPlayer.factionsPlayed.push(newFactionEntry);
                        updatedPlayer.factionsPlayed.sort();
                    }
                    set(ref(database, 'players/' + item.name), updatedPlayer);
                }
                else {
                    //create new entry for player.
                    let newPlayer = {
                        wins: game.victor === item.name ? 1 : 0,
                        gamesPlayed: 1,
                        factionsPlayed: [
                            {
                                name: item.faction,
                                plays: 1,
                                wins: game.victor === item.name ? 1 : 0,
                            }
                        ]
                    }
                    set(ref(database, 'players/' + item.name), newPlayer);
                }
            })
        });

        //Get existing faction information from db
        let updatedFactionList = [];
        get(child(testRef, 'factions')).then((snapshot) => {
            updatedFactionList = snapshot.val();

            //loop through each player in the added game.
            game.players.forEach((player) => {
                //Update faction statistic information based on player information.
                //Find the index of the player's faction.
                const factionIndex = updatedFactionList.findIndex((dbFaction) => {
                    return dbFaction.name === player.faction;
                });
                if(factionIndex !== -1) {
                    //If the faction exists, update its information
                    const factionWins = updatedFactionList[factionIndex].wins;
                    updatedFactionList[factionIndex].plays = updatedFactionList[factionIndex].plays + 1;
                    updatedFactionList[factionIndex].wins = game.victor === player.name ? factionWins + 1 : factionWins;

                }
                else {
                    //If the faction does not exist, create a new entry for it.
                    const newFactionEntry = {
                        name: player.faction,
                        plays: 1,
                        wins: game.victor === player.name ? 1 : 0,
                    }
                    updatedFactionList.push(newFactionEntry);
                }
            });

            //Update the faction information list in the database (outside of the forEach so we do not overwrite changes).
            set(ref(database, 'factions'), updatedFactionList);
        });
        populateData();
    }
        const addImage = require('../Blue Add Button.png');
        return (
            <div>
                <div className="mainpage__titleBar">
                    <TitleBar/>
                    <NavigationMenu gamesPageHandler={gamePage} statsPageHandler={statsPage} currPage={currPage}/>
                </div>
                {currPage === "games" && <div className='mainpage'>
                    {gameList && <CardOrganizer cardList={gameList}/>}
                    <div className="mainPage__addButtonContainer">
                        <img className="mainpage__addImage" src={addImage} alt="An icon denoting the ability to add games" onClick={addGameButtonHandler}/>
                    </div>
                    {addingGame && <AddGame className="mainpage__addButton" closeHandler={closeAddGameHandler} submitHandler={addGameSubmitHandler} factionList={factionList}/>}
                </div>}
                {currPage === "stats" && <div className='mainpage'>
                    <StatisticsPage playerStats={playerStats} factionStats={factionStats}/>
                </div>}
            </div>
    );
}

export default MainPage;