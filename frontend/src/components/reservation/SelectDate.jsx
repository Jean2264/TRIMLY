import "./SelectDate.css"
import DayButton from "./DayButton"


const days = [
    { letter: "L", name: "Lun" },
    { letter: "M", name: "Mar" },
    { letter: "X", name: "Mié" },
    { letter: "J", name: "Jue" },
    { letter: "V", name: "Vie" },
    { letter: "S", name: "Sáb" },
    { letter: "D", name: "Dom" }
];



function SelectDate({selectedDay, setSelectedDay, setSelectedTime})
{
    return(
        
        <div className="select-date">

           
          {days.map(day =>
            (
                <DayButton
                selected={selectedDay===day.name}
                onClick={() => {
                setSelectedDay(day.name);
                setSelectedTime(null);
}}
                key={day.letter}
                letter={day.letter}
                name={day.name}
                />
            )
          )}
           
        </div>
    )
}

export default SelectDate;