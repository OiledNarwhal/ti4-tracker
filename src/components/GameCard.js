import "./GameCard.css";
//import image from ".././ti4.jpg";
import { useState } from "react";
import ExpandCard from "./ExpandCard";
import mec from "../factionImages/Mecatol Rex.png";
import vp from "../factionImages/CustodiansVP.png";
import date from '../Date Icon.png';

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
  const victorIndex = props.cardInfo.players.findIndex((player) => {
    return player.name === props.cardInfo.victor;
  });
  const factionCardBack = require(`../factionImages/FactionCardBacks/${props.cardInfo.players[victorIndex].faction}.png`);
  const factionHomeSystem = require(`../factionImages/HomeSystems/${props.cardInfo.players[victorIndex].faction}.png`);
  const factionImage = require(`../factionImages/${props.cardInfo.players[victorIndex].faction}.png`);

  //<img src={factionImage} className="gamecard__faction" alt="TI4 Base" />


  return (
    <>
      {cardClicked && (
        <ExpandCard cardInfo={props.cardInfo} closeModal={closeModal} />
      )}
      <div className="gamecard" onClick={cardClickHandler}>
        <img src={factionCardBack} className="gamecard__image" alt="mecatol Rex"/>
        <div className="gamecard__positioning">
          <div className="gamecard__title">
            <h2>{props.cardInfo.title}</h2>
          </div>
          <div className="gamecard__content">
            <div className="gamecard__victor">
            <img src={vp} className="gamecard__victorImage" alt="An icon denoting the victor"/>
              <div className="gamecard__victorContent">
                <p>{props.cardInfo.victor}</p>
                <p>{props.cardInfo.players[victorIndex].faction}</p>
              </div>
            </div>
            <div className="gamecard__date">
              <img src={date} className="gamecard__dateImage" alt="An icon denoting the date"/>
              <p>Date: {props.cardInfo.date}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameCard;
