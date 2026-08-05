import "./DayButton.css"
function DayButton({letter, name, onClick, selected})
{
    return(
        <button className={`day-button ${selected ? "selected" : ""}`} onClick={onClick}>

                <span className="day-letter">{letter}</span>
              <span className="day-name">{name}</span>
            </button>
    );
}

export default DayButton;