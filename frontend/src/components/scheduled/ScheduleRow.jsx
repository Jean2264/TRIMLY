import "./ScheduleRow.css";

function ScheduleRow({ day, open, hours }) {
  return (
    <div className={`schedule-row ${!open ? "closed" : ""}`}>
      <div className="schedule-day">
        <i
          className={`bi ${open ? "bi-calendar2-plus" : "bi-calendar2-x"}`}
        ></i>

        <p>{day}</p>
      </div>

      <p className="schedule-hours">{open ? hours : "Cerrado"}</p>
    </div>
  );
}

export default ScheduleRow;
