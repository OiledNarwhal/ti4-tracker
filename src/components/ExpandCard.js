import './ExpandCard.css';

function ExpandCard(props) {

    function closeModal() {
        props.closeModal();
    }
    
    let playerList = '';
    props.cardInfo.players.forEach(item => {
        playerList = playerList + item + ', ';
    });
    playerList = playerList.trim().slice(0, -1);

    let factionList = '';
    props.cardInfo.factions.forEach(item => {
        factionList = factionList + item + ', ';
    });
    factionList = factionList.trim().slice(0, -1);
    return (
        <div>
            <div className="backdrop" onClick={closeModal}/>
            <div className="modal">
                <header className="header">
                    <h2>{props.cardInfo.title}</h2>
                </header>
                <div className="content">
                    <p>Victor: {props.cardInfo.victor}</p>
                    <p>Factions: {factionList}</p>
                    <p>Point Count: {props.cardInfo.pointCount}</p>
                    <p>Players: {playerList}</p>
                </div>
                <footer className="footer">
                    <button onClick={closeModal}>Close</button>
                </footer>
            </div>
        </div>
    )
}

export default ExpandCard;