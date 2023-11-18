import "./Board.css";
import { useState, useEffect } from "react";
import WordRow from "../WordRow/WordRow";
import { checkGuess } from "../../utils/checkGuess";
import words from "../../utils/words.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../Popup/Popup";

const Board = () => {
  const WORD_OF_THE_DAY = "BOARD";
  const CHANCES = 6;
  const CHAR_LIMIT = 5;

  const [currentWord, setCurrentWord] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [textStatus, setTextStatus] = useState("");
  const [popupState, setPopupState] = useState(false);
  const [boardStatus, setBoardStatus] = useState([]); 

  useEffect(() => {
    const didWin =
      boardStatus.length > 0 &&
      Object.values(boardStatus[boardStatus.length - 1]).every(
        (v) => v === "green"
      );
    if (guesses.length === CHANCES || didWin) {
      setTimeout(function () {
        setIsGameOver(true);
        setPopupState(true);
        if (didWin) {
          setTextStatus("You Won");
        } else {
          setTextStatus("You Lost");
        }
      }, 600);
    }
  }, [guesses, boardStatus]);

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
      if (!words.includes(currentWord.toLocaleLowerCase())) {
        notify();
        return;
      }
      setGuesses((prev) => [...prev, currentWord]);
      const result = checkGuess(currentWord, WORD_OF_THE_DAY);
      setBoardStatus((prev) => [...prev, result]);
      setCurrentWord("");
    }
  };

  const word = (letter = "") => {
    letter = letter.toLocaleUpperCase();
    setCurrentWord((prev) => (prev.length === 5 ? prev : prev + letter));
  };

  const handleKeyDown = (e) => {
    if (isGameOver) {
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
        <WordRow key={i} word={guess} result={boardStatus[i]} />
      ))}

      {[...Array(CHANCES - guesses.length)].map((_, i) => (
        <WordRow
          key={i}
          word={i === 0 ? currentWord : ""}          
        />
      ))}

      <Popup
        trigger={popupState}
        setTrigger={setPopupState}
        winStatus={textStatus}
        wordOfTheDay={WORD_OF_THE_DAY}
      />
    </div>
  );
};

export default Board;
