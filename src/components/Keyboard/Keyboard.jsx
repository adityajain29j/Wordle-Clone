import React from "react";
import KeyboardKey from "../KeyboardKey/KeyboardKey";
import "./Keyboard.css";

const Keyboard = ({ keyColors, clickLetter }) => {
  const keyboardTopRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyboardMiddleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyboardBottomRow = ["↵", "Z", "X", "C", "V", "B", "N", "M","←"];

  return (
    <div className="keyboard">
      <div className="keyboard-key-row">
        {keyboardTopRow.map((keyLetter) => (
          <KeyboardKey
            key={keyLetter}
            letter={keyLetter}
            keyColor={keyColors ? keyColors[keyLetter] : ""}
            letterOnClick={clickLetter}
          />
        ))}
      </div>
      <div className="keyboard-key-row">
        {keyboardMiddleRow.map((keyLetter) => (
          <KeyboardKey
            key={keyLetter}
            letter={keyLetter}
            keyColor={keyColors ? keyColors[keyLetter] : ""}
            letterOnClick={clickLetter}
          />
        ))}
      </div>
      <div className="keyboard-key-row">
        {keyboardBottomRow.map((keyLetter) => (
          <KeyboardKey
            key={keyLetter}
            letter={keyLetter}
            keyColor={keyColors ? keyColors[keyLetter] : ""}
            letterOnClick={clickLetter}
          />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
