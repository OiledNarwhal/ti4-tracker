import "./GameCard.css";
import image from ".././ti4.jpg";
import { useState } from "react";
import ExpandCard from "./ExpandCard";

/**
 *
 * Props:
 *  cardInfo = {
 *  title
 *  Victor
 *  Factions
 *  Point Count
 *  Players
 *  }
 */
function GameCard(props) {
  /*
    We need an image, a title, the factions played, the victor, and the point count. And then an expanded window for more information
    */

  const [cardClicked, setCardClicked] = useState(false);

  function cardClickHandler() {
    setCardClicked(true);
  }
  function closeModal() {
    setCardClicked(false);
  }


  return (
    <>
      {cardClicked && (
        <ExpandCard cardInfo={props.cardInfo} closeModal={closeModal} />
      )}
      <div className="gamecard" onClick={cardClickHandler}>
        <img src={image} className="gamecard__image" alt="TI4 Base" />
        <div className="gamecard__title">
          <h2>{props.cardInfo.title}</h2>
        </div>
        <div className="gamecard__content">
          <p>Victor: {props.cardInfo.victor}</p>
          <p>Point Count: {props.cardInfo.pointCount}</p>
        </div>
      </div>
    </>
  );
}

export default GameCard;
