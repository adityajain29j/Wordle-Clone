import "./WordCell.css";

const WordCell = ({ letter = "", result }) => {
  let border = "border-true";
  if (!letter) border = "border-false";
  if (result) {
    border = result;
  }
  return (
    <div className="word-cell">
      <div className={border}>{letter}</div>
    </div>
  );
};

export default WordCell;
