import SelectTime from "./SelectTime";
import SelectDate from "./SelectDate";
import { useState } from "react";
import "./SelectSchedule.css"

function SelectSchedule({
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime
})
{
   
    return(
        <div className="select-schedule">
            <SelectDate
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setSelectedTime={setSelectedTime}
            />
         <SelectTime
         selectedDay={selectedDay}
         selectedTime={selectedTime}
         setSelectedTime={setSelectedTime} />
        </div>
    )
}

export default SelectSchedule;