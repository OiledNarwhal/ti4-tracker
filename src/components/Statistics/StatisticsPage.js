import './StatisticsPage.css'
import PlayerStats from './PlayerStats';

function StatisticsPage(props) {

    return (
        <div className="statsPage">
            <PlayerStats playerStats={props.playerStats}/>
        </div>
    );
}

export default StatisticsPage;