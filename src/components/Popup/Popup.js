import './Popup.css'

const Popup = (props) => {
    return (props.trigger) ? ( 
        <div className="popup">
            <div className="content">
                <button onClick={() => {props.setTrigger(false)}}> X </button>
                <div>  {props.winStatus} </div>
                <div>
                    Word of the Day is {props.wordOfTheDay}
                </div>
            </div>
        </div>
     ) : "";
}
 
export default Popup;  