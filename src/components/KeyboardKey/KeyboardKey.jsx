import React from "react";
import "./KeyboardKey.css";

const KeyboardKey = ({ letter, keyColor }) => {
  return (
    <div className={`keyboard-key keycolor-${keyColor}`}>
      <div className={`keyboard-key-letter`}>{letter}</div>
    </div>
  );
};

export default KeyboardKey;
