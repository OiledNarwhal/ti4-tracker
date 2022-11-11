import './PlayerStats.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend, Text } from 'recharts';

function PlayerStats(props) {
    
    const barColors = ['#eb4034', '#ebd234', '#7aeb34', '#34ebcf', '#345eeb', '#a134eb', '#eb34cc', '#eb3467', '#e69720']
    let gamesPlayedData = [];
    let winRateData = []
    const playerNames = Object.keys(props.playerStats);
    playerNames.forEach((player) => {
        gamesPlayedData.push({name: player, gamesPlayed: props.playerStats[player].gamesPlayed});
        winRateData.push({name: player, winRate: props.playerStats[player].wins / props.playerStats[player].gamesPlayed});
    })
    
    return (
        <div className="playerStats">
            <div className="playerStats__chart">
                <BarChart width={300} height={300} data={gamesPlayedData} margin={{top: 10, bottom: 10, left: 0, right: 10}} barCategoryGap={0}>
                    <Bar dataKey="gamesPlayed">
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
                <BarChart width={300} height={300} data={winRateData} margin={{top: 10, bottom: 10, left: 0, right: 10}} barCategoryGap={0}>
                    <Bar dataKey="winRate" minPointSize={3}>
                        {gamesPlayedData.map((entry, index) => {
                            return <Cell key={`Cell-${index}`} fill={barColors[index % 9]}/>
                        })}
                    </Bar>
                    <XAxis dataKey="name" height={0}/>
                    <YAxis/>
                    <Tooltip cursor={false}/>
                </BarChart>
            </div>
        </div>
    );
}

export default PlayerStats;