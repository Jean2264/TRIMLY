 import TimeButton from "./TimeButton";
 import "./SelecTime.css"
 import { useState } from "react";

const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30"
];


function SelectTime({selectedDay, selectedTime, setSelectedTime})
{
    
    if(!selectedDay)
    {
        return(
              <p>Seleccioná un día para ver los horarios disponibles</p>
        );
    }
    return(
            <div className="select-time">

              {times.map(time =>(

                <TimeButton
                   key={time}
                   time={time}
                   selected={selectedTime===time}
                   onClick={()=> setSelectedTime(time)}
                />
              ))}
            </div>
    );
}

export default SelectTime;