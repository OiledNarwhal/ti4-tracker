import GameCard from "./GameCard";
import './CardOrganizer.css'

/**
 * 
 * props
 * cardlist - array of card objects.
 */
function CardOrganizer(props) {
    
    return (
        <div className='cardorganizer'>
            {props.cardList.map(item => {
                return <GameCard key={Math.random()} cardInfo={item}/>
            })}
        </div>
    )
}

export default CardOrganizer;