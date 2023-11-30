import React from "react";
import "./Board.css";
import { useState, useEffect } from "react";
import WordRow from "../WordRow/WordRow";
import words from "../../utils/words.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../Popup/Popup";
import { STATUS, checkGuess } from "../../utils/utils";
import Keyboard from "../Keyboard/Keyboard";

const Board = () => {
  const WORD_OF_THE_DAY = "PRUNE";
  const FIRST_CHANCE = 6;
  const SECOND_CHANCE = 11;
  const CHAR_LIMIT = 5;
  const ANIMATIONS = {
    SHAKE_LETTER: "shake-letter",
    JUMP_LETTER: "jump-letter",
  };

  const [keyboardKeyColors, setKeyboardKeyColors] = useState({});

  const [currentWord, setCurrentWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [textStatus, setTextStatus] = useState("");
  const [popupState, setPopupState] = useState(false);
  const [boardStatus, setBoardStatus] = useState([]);
  const [letterAnimation, setLetterAnimation] = useState("");
  const [disableInteraction, setDisableInteraction] = useState(false);
  const [windIndex, setWinIndex] = useState(-1);
  const [chances, setChances] = useState(FIRST_CHANCE);

  useEffect(() => {
    const didWin =
      boardStatus.length > 0 &&
      Object.values(boardStatus[boardStatus.length - 1]).every(
        (v) => v === "green"
      );
    if (didWin) {
      setWinIndex(boardStatus.length - 1);
      setDisableInteraction(true);
      setTimeout(() => setLetterAnimation(ANIMATIONS.JUMP_LETTER), 500);
    }
    if (didWin || guesses.length === chances) {
      setTimeout(function () {
        setIsGameOver(true);
        setPopupState(true);
        if (didWin) {
          setTextStatus(STATUS.WIN);
        } else {
          setTextStatus(STATUS.LOSE);
        }
      }, 1000);
    }
  }, [guesses, boardStatus, ANIMATIONS.JUMP_LETTER, chances]);

  const notify = () =>
    toast.error("Please enter a valid word", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const backspace = () => {
    setCurrentWord((prev) => prev && prev.slice(0, -1));
  };

  const enter = () => {
    if (currentWord.length === CHAR_LIMIT) {
      setDisableInteraction(true);
      setTimeout(() => setDisableInteraction(false), 500);
      if (!words.includes(currentWord.toLocaleLowerCase())) {
        setLetterAnimation(ANIMATIONS.SHAKE_LETTER);
        setTimeout(() => setLetterAnimation(""), 500);
        notify();
        return;
      }
      setGuesses((prev) => [...prev, currentWord]);
      const result = checkGuess(
        currentWord,
        WORD_OF_THE_DAY,
        keyboardKeyColors,
        setKeyboardKeyColors
      );
      setBoardStatus((prev) => [...prev, result]);
      setCurrentWord("");
    }
  };

  const word = (letter = "") => {
    letter = letter.toLocaleUpperCase();
    setCurrentWord((prev) => (prev.length === 5 ? prev : prev + letter));
  };

  const handleKeyDown = (e) => {
    if (isGameOver || disableInteraction) {
      return;
    }
    let pressedKey = String(e.key);
    if (pressedKey === "Backspace") {
      backspace();
      return;
    } else if (pressedKey === "Enter") {
      enter();
      return;
    }
    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      word(pressedKey);
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  });

  const takeMoreGuess = () => {
    if (chances === FIRST_CHANCE) {
      setChances(SECOND_CHANCE);
      setIsGameOver(false);
    }
  };

  return (
    <div className="Board">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {guesses.map((guess, i) => (
        <WordRow
          key={i}
          word={guess}
          result={boardStatus[i]}
          showAnimation={letterAnimation === "jump-letter" && windIndex === i}
          letterAnimation={letterAnimation}
        />
      ))}

      {[...Array(chances - guesses.length)].map((_, i) => (
        <WordRow
          key={i}
          word={i === 0 ? currentWord : ""}
          letterAnimation={letterAnimation}
        />
      ))}

      <Keyboard keyColors={keyboardKeyColors} />

      <Popup
        trigger={popupState}
        setTrigger={setPopupState}
        winStatus={textStatus}
        wordOfTheDay={WORD_OF_THE_DAY}
        noOfGuess={guesses.length}
        takeMoreGuess={takeMoreGuess}
      />
    </div>
  );
};

export default Board;
