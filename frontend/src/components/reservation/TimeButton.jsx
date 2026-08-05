import "./TimeButton.css"
function TimeButton({time,selected, onClick})
{
    return(
       <button className={`time-button ${selected ? "selected" : ""}`}
       onClick={onClick}>
        {time}
       </button>
    )
}
export default TimeButton;