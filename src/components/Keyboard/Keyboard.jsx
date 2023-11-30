import React from "react";
import KeyboardKey from "../KeyboardKey/KeyboardKey";
import "./Keyboard.css";

const Keyboard = ({ keyColors }) => {
  const keyboardTopRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyboardMiddleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyboardBottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="keyboard">
      <div className="keyboard-toprow">
        {keyboardTopRow.map((keyLetter) => (
          <KeyboardKey
            key={keyLetter}
            letter={keyLetter}
            keyColor={keyColors ? keyColors[keyLetter] : ""}
          />
        ))}
      </div>
      <div className="keyboard-middlerow">
        {keyboardMiddleRow.map((keyLetter) => (
          <KeyboardKey
            key={keyLetter}
            letter={keyLetter}
            keyColor={keyColors ? keyColors[keyLetter] : ""}
          />
        ))}
      </div>
      <div className="keyboard-bottomrow">
        {keyboardBottomRow.map((keyLetter) => (
          <KeyboardKey
            key={keyLetter}
            letter={keyLetter}
            keyColor={keyColors ? keyColors[keyLetter] : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
