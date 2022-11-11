import './PlayerStats.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend, Text, PieChart, Pie } from 'recharts';
import { useState } from 'react';

function PlayerStats(props) {
    
    const playerNames = Object.keys(props.playerStats);
    const [focusPlayer, setFocusPlayer] = useState(playerNames[0])
    const barColors = ['#eb4034', '#ebd234', '#7aeb34', '#34ebcf', '#345eeb', '#a134eb', '#eb34cc', '#eb3467', '#e69720']
    let gamesPlayedData = [];
    let winRateData = []
    let playerFactionData = [];

    playerNames.forEach((player) => {
        gamesPlayedData.push({name: player, gamesPlayed: props.playerStats[player].gamesPlayed});
        winRateData.push({name: player, winRate: (props.playerStats[player].wins / props.playerStats[player].gamesPlayed) * 100});
    })

    props.playerStats[focusPlayer].factionsPlayed.forEach((faction) => {
        playerFactionData.push({name: faction.name, plays: faction.plays})
    })

    function playerChangeHandler(event) {
        setFocusPlayer(event.target.value);
    }
    
    return (
        <div className="playerStats">
            <h3>Player Stats</h3>
            <div className="playerStats__chart">
                <label>Players' Game Count</label>
                <BarChart width={300} height={200} data={gamesPlayedData} margin={{top: 10, bottom: 10, left: 0, right: 10}} barCategoryGap={0}>
                    <Bar dataKey="gamesPlayed" unit=" Games" animationDuration={1500}>
                        {gamesPlayedData.map((entry, index) => {
                            return <Cell key={`Cell-${index}`} fill={barColors[index % 9]}/>
                        })}
                    </Bar>
                    <XAxis dataKey="name" height={0}/>
                    <YAxis/>
                    <Tooltip cursor={false}/>
                </BarChart>
            </div>
            <div className="playerStats__chart">
                <label>Players' Win Percentage</label>
                <BarChart width={300} height={200} data={winRateData} margin={{top: 10, bottom: 10, left: 0, right: 10}} barCategoryGap={0}>
                    <Bar dataKey="winRate" minPointSize={3} unit="%" animationDuration={1500}>
                        {gamesPlayedData.map((entry, index) => {
                            return <Cell key={`Cell-${index}`} fill={barColors[index % 9]}/>
                        })}
                    </Bar>
                    <XAxis dataKey="name" height={0}/>
                    <YAxis/>
                    <Tooltip cursor={false}/>
                </BarChart>
            </div>
            <div className="playerStats__chart">
                <div className="playerStats__selector">
                    <select name="players" id="player-select" onChange={playerChangeHandler} value={focusPlayer}>
                        {playerNames.map((item) => {
                            return <option key={Math.random()} value={item}>{item}</option>
                        })}
                    </select>
                    <label> Faction Preference</label>
                </div>
                <PieChart width={300} height={200}>
                    <Pie dataKey="plays" data={playerFactionData} isAnimationActive={true} cx="50%" cy="50%" outerRadius={50} unit=" Games">
                        {playerFactionData.map((entry, index) => {
                            return <Cell key={`Cell-${index}`} fill={barColors[index % 9]}/>
                        })}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </div>

        </div>
    );
}

export default PlayerStats;