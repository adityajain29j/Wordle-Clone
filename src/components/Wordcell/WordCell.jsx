import React from "react";
import "./WordCell.css";

const WordCell = ({ letter = "", result, letterAnimation = "" }) => {  
  let border = "border-true";
  if (!letter) border = "border-false";
  if (result) {
    border = result;
  }
  return (
    <div
      className={`word-cell${
        letter && letterAnimation ? ` ${letterAnimation}` : ""
      }`}
    >
      <div className={border}>{letter}</div>
    </div>
  );
};

export default WordCell;
