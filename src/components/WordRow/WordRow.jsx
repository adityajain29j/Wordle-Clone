import React from "react";
import "./WordRow.css";
import WordCell from "../Wordcell/WordCell";

const WordRow = ({
  word = "",
  result,
  showAnimation = true,
  letterAnimation = "",
}) => {
  return (
    <div className="word-row">
      {Array.from(Array(5)).map((_, i) => (
        <WordCell
          key={i}
          letter={word[i] || ""}
          result={result ? result[i] : null}
          letterAnimation={showAnimation ? letterAnimation : ""}
        />
      ))}
    </div>
  );
};

export default WordRow;
