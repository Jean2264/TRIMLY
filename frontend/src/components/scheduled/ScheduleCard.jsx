import "./ScheduleCard.css";
import ScheduleRow from "./ScheduleRow";

function ScheduleCard()
{
    return(
        <div className="Schedule-card">
       <ScheduleRow />
       <ScheduleRow/>
        </div>
    )
}
export default ScheduleCard;