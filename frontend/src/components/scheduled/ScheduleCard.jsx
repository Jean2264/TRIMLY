import "./ScheduleCard.css";
import ScheduleRow from "./ScheduleRow";

function ScheduleCard({ schedule }) {
  return (
    <div className="schedule-card">
      {schedule.map((item) => (
        <ScheduleRow
          key={item.day}
          day={item.day}
          open={item.open}
          hours={item.hours}
        />
      ))}
    </div>
  );
}

export default ScheduleCard;
