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
    return (
        <div>
            <div className="backdrop" onClick={closeModal}/>
            <div className="modal">
                <header className="header">
                    <h2>{props.cardInfo.title}</h2>
                </header>
                <div className="content">
                    <p>Victor: {props.cardInfo.victor}</p>
                    <p>Date: {props.cardInfo.date}</p>
                    <p>Point Count: {props.cardInfo.pointCount}</p>
                    <p>Players and Factions: </p>
                    <div className="expandcard__players">
                    {props.cardInfo.players.map((item) => {
                        return (<p key={Math.random()} style={{color: item.name === props.cardInfo.victor ? 'gold' : 'white'}}>{item.name} - {item.faction}</p>)
                    })}
                    </div>
                </div>
                <footer className="footer">
                    <button onClick={closeModal}>Close</button>
                </footer>
            </div>
        </div>
    )
}

export default ExpandCard;