import React from "react";
import "./Card.css";

function Card({ card, handleChoice, flipped, disabled }) {
  function clickCard() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front card" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={clickCard}
          alt="back card"
        />
      </div>
    </div>
  );
}

export default Card;
