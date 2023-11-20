import React, { useState } from "react";
import "./Popup.css";
import CloseIcon from "../../icons/CloseIcon";
import { STATUS } from "../../utils/utils";

const Popup = ({
  trigger,
  setTrigger,
  winStatus,
  wordOfTheDay,
  noOfGuess,
  takeMoreGuess,
}) => {
  const [color, setColor] = useState("black");

  const [shouldShowAnswer, setShouldShowAnswer] = useState(false);

  const takeMoreGuessHandler = () => {
    setTrigger(false);
    setShouldShowAnswer(true);
    takeMoreGuess();
  };

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
          {(winStatus === STATUS.WIN || shouldShowAnswer) && (
            <div className="display-answer">
              <div className="answer-text">The word set was:</div>
              <div className="answer">{wordOfTheDay}</div>
              {winStatus === STATUS.WIN && (
                <div className="guesses"> Turns took to guess: {noOfGuess}</div>
              )}
            </div>
          )}
          {!shouldShowAnswer && (
            <div className="btn-cta">
              <div>Your chances are over</div>
              <div className="btn-more-guesses" onClick={takeMoreGuessHandler}>
                Get 5 more guesses
              </div>
              <div
                className="btn-show-answer"
                onClick={() => setShouldShowAnswer(true)}
              >
                Show answer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
