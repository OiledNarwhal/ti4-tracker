import './FactionStats.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

function FactionStats(props) {
    let gamesPlayedData = [];
    let winRateData = []
    const barColors = ['#eb4034', '#ebd234', '#7aeb34', '#34ebcf', '#345eeb', '#a134eb', '#eb34cc', '#eb3467', '#e69720']

    props.factionStats.forEach((faction) => {
        gamesPlayedData.push({name: faction.name, plays: faction.plays});
        winRateData.push({name: faction.name, winRate: (faction.wins / faction.plays) * 100});
    })

    return (
        <div className="playerStats">
            <h3>Faction Stats</h3>
            <div className="playerStats__chart">
                <label>Factions' Game Count</label>
                <BarChart width={300} height={200} data={gamesPlayedData} margin={{top: 10, bottom: 10, left: 0, right: 10}} barCategoryGap={0}>
                    <Bar dataKey="plays" unit=" Games" animationDuration={1500}>
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
                <label>Factions' Win Percentage</label>
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
        </div>
    );
}

export default FactionStats;