import CardOrganizer from "./CardOrganizer";
import NavigationMenu from "./NavigationMenu";
import AddGame from "./AddGame";
import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
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
    let cards = [];

    const testRef = ref(database);
    get(child(testRef, 'games')).then((snapshot) => {
        if(snapshot.exists()) {
            for(const property in snapshot.val())
            {
                console.log(property + ' = ' + snapshot.val()[property]);
            };
            //await cards = Object.entries(snapshot.val());
        }
        else {
            console.log('No data available');
        }
    }).catch((error => {
        console.error(error);
    }))
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
            title: "The Sun's Rise",
            victor: "Muatt",
            factions: ["Muatt", "Hacan", "Yin", "Argent", "Mahact", "Empyrean", "Sardakk Norr"],
            players: ["Amy", "Bryce", "Matthew", "Stephen", "Jake", "Michael", "Max"],
            pointCount: 12,
        },
        {
            title: "The Age of Turtles",
            victor: "Xxcha",
            factions: ["Xxcha", "Nekro", "NRA", "Titans", "Barony", "???"],
            players: ["Amy", "Bryce", "Matthew", "Stephen", "Jake", "???"],
            pointCount: 14,
        },
        {
            title: "The Sun's Rise",
            victor: "Muatt",
            factions: ["Muatt", "Hacan", "Yin", "Argent", "Mahact", "Empyrean", "Sardakk Norr"],
            players: ["Amy", "Bryce", "Matthew", "Stephen", "Jake", "Michael", "Max"],
            pointCount: 12,
        },
    ];

    const [gameList, setGameList] = useState(dummyCards);

    function addGameButtonHandler() {
        setAddingGame(true);
    }
    function closeAddGameHandler() {
        setAddingGame(false);
    }

    function addGameSubmitHandler(game) {
        setGameList([...gameList, game]);
    }

    return (
        <div className='mainpage'>
            <NavigationMenu/>
            <CardOrganizer cardList={gameList}/>
            <button onClick={addGameButtonHandler} style={{alignSelf: 'flex-end'}}>Add</button>
            {addingGame && <AddGame closeHandler={closeAddGameHandler} submitHandler={addGameSubmitHandler}/>}
        </div>
    );
}

export default MainPage;