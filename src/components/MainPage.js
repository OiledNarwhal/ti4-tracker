import CardOrganizer from "./CardOrganizer";
import NavigationMenu from "./NavigationMenu";
import AddGame from "./AddGame";
import { useState, useEffect } from "react";

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
        
        await get(child(testRef, 'games')).then((snapshot) => {
            let cards = [];
            if(snapshot.exists()) {
                for(const game in snapshot.val())
                {
                    cards.push(snapshot.val()[game]);
                };
                //await cards = Object.entries(snapshot.val());
            }
            else {
                console.log('No game data available');
            }
            setGameList(cards);
        }).catch((error => {
            console.error(error);
        }))

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
        
       console.log('here');
       //setGameList(dummyCards);

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

    let dummyCards = [
        {
            title: "The Turtles Strike back",
            date: "2022-07-14",
            victor: "Stephen",
            pointCount: "14",
            players: [
                {
                    name: "Stephen",
                    faction: "The Arborec"
                },
                {
                    name: "Bryce",
                    faction: "The Barony of Letnev"
                },
                {
                    name: "Amy",
                    faction: "Federation of Sol"
                },
                {
                    name: "Matthew",
                    faction: "The Arborec"
                },
                {
                    name: "Jake",
                    faction: "The Barony of Letnev"
                }
            ]
        }
    ];

    const [factionList, setFactionList] = useState(false);
    const [gameList, setGameList] = useState(undefined);
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
        return (
        <div className='mainpage'>
            <NavigationMenu/>
            {gameList && <CardOrganizer cardList={gameList}/>}
            <button onClick={addGameButtonHandler} style={{alignSelf: 'flex-end'}}>Add</button>
            {addingGame && <AddGame closeHandler={closeAddGameHandler} submitHandler={addGameSubmitHandler} factionList={factionList}/>}
        </div>
    );
}

export default MainPage;