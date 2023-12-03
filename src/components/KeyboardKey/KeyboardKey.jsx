import React from "react";
import "./KeyboardKey.css";

const KeyboardKey = ({ letter, keyColor, letterOnClick }) => {
  return (
    <div
      className={`keyboard-key keycolor-${keyColor}`}
      onClick={() => letterOnClick(letter)}
    >
      <div className={`keyboard-key-letter`}>{letter}</div>
    </div>
  );
};

export default KeyboardKey;
