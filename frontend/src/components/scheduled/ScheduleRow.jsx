import "./ScheduleRow.css"


function ScheduleRow()
{
    return(

        <div className="Schedule-Row">
            <button><i class="bi bi-calendar-minus"></i></button>
            <p>Lunes a Viernes</p>
            <p>09:00-21:00</p>

        </div>
    );
}

export default ScheduleRow;