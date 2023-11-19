import React, { useState } from "react";
import "./Popup.css";
import CloseIcon from "../../icons/CloseIcon";
import { STATUS } from "../../utils/utils";

const Popup = ({ trigger, setTrigger, winStatus, wordOfTheDay, noOfGuess }) => {
  const [color, setColor] = useState("black");

  return trigger ? (
    <div className="popup-window">
      <div className="content-window">
        <div className="close-row">
          <div
            className="close-btn"
            onClick={() => {
              setColor("black");
              setTrigger(false);
            }}
            onMouseEnter={() => setColor("red")}
            onMouseLeave={() => setColor("black")}
          >
            <CloseIcon size="24px" color={color} />
          </div>
        </div>
        <div className="win-status"> {winStatus} </div>
        <div className="summary">
          <div className="answer-text">The word set was:</div>
          <div className="answer">{wordOfTheDay}</div>
          {winStatus === STATUS.WIN && (
            <div className="guesses"> Turns took to guess: {noOfGuess}</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
