import "./ScheduleCard.css";
import ScheduleRow from "./ScheduleRow";

function ScheduleCard()
{
    return(
        <div className="Schedule-card">
       <ScheduleRow />
       <hr/>
       <ScheduleRow/>
        </div>
    )
}
export default ScheduleCard;