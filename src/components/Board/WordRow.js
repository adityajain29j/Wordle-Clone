import './WordRow.css'
import WordCell from './WordCell.js'
const WordRow = ({word = '', result}) => {
    return ( 
        <div className='word-row'>
            {Array.from(Array(5)).map((_,i) => (
                <WordCell letter = {word[i] || ''} result={result? result[i] : null}/>
            ))}
        </div>
     );
}
 
export default WordRow;