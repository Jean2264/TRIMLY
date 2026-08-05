import image from "../../assets/img/barber.jpg"
import "./EmployeeProfileHeader.css";

function EmployeeProfileHeader()
{
    return(
        <div className="employee-profile-header">
            <div className="employee-profile-photo">
                <img src={image} alt="employee"/>
            </div>
        </div>
    )
}

export default EmployeeProfileHeader;