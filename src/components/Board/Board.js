import './Board.css'
import { useState, useEffect} from 'react';
import WordRow from './WordRow.js';
import { checkGuess } from '../../utils/checkGuess';
import words from '../../utils/words.json';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from './Popup';
const Board = () => {

    const WordOfTheDay = "HELLO";
    const [currentWord,setCurrentWord] = useState('');
    const [guesses,setGuesses] = useState([]);
    const chances = 5;
    const [gameState,setGameState] = useState('Running');
    const [textStatus, setTextStatus] = useState('');
    const [popupState,setPopupState] = useState(false);

    const notify = () => toast.error('Please enter a valid word', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const backspace = () => {
        setCurrentWord(prev => prev && prev.slice(0,-1));
        setTextStatus('');
    } 

    const enter = () => {
        if (currentWord.length === 5) {

            if (!words.includes(currentWord.toLocaleLowerCase())) {
                notify();
                return;
            }

            setGuesses(prev => [...prev,currentWord]);
            const result = checkGuess(currentWord, WordOfTheDay);
            setCurrentWord('');

            if (Object.values(result).every(v => v === 'green') &&
                Object.values(result).length === 5) {
                    setGameState('Stopped');
                    setTextStatus("You Won");
                    setPopupState(true);
            }

            else if (guesses.length === 5) {
                setGameState('Stopped');
                setTextStatus("You Lost");
                setPopupState(true);
            }
        }
    }

    const word = (letter = '') => {
        letter = letter.toLocaleUpperCase();
        setCurrentWord(prev => prev.length === 5 ? prev : prev + letter);
        setTextStatus('');
    }

    const handleKeyDown = e => {
        if (gameState != "Running") {
            return;
        } 
        let pressedKey = String(e.key);
        if (pressedKey === "Backspace") {
            backspace();
            return;
        }
        else if (pressedKey === "Enter") {
            enter();
            return;
        }
        let found = pressedKey.match(/[a-z]/gi);
        if (!found || found.length > 1) {
            return;
        }
        else {
            word(pressedKey);
        }
    }
    useEffect(() => {
        window.addEventListener('keyup',handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyDown);
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
            {guesses.map(guess => ( 
                <WordRow word = {guess} result = {checkGuess(guess,WordOfTheDay)}/>
            ))}
            {textStatus !== "You Lost" && <WordRow word = {currentWord}/> }
        
            {textStatus != "You Lost" && [...Array(chances - guesses.length)].map(chance => (
                <WordRow word = ""/>
            ))}
            
            <Popup trigger = {popupState} setTrigger = {setPopupState} winStatus = {textStatus} wordOfTheDay = {WordOfTheDay}/>
        </div>
     );
}
 
export default Board;