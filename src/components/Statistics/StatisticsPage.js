import './StatisticsPage.css'
import PlayerStats from './PlayerStats';
import FactionStats from './FactionStats';

function StatisticsPage(props) {

    return (
        <div className="statsPage">
            <PlayerStats playerStats={props.playerStats}/>
            <FactionStats factionStats={props.factionStats}/>
        </div>
    );
}

export default StatisticsPage;