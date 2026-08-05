import "./EmployeeCard.css";
import SeeMoreButton from "../common/SeeMoreButton";

function EmployeeCard({employee, selected, onClick})
{
   
    return(
        <div className={`employee-card ${selected ? "selected" : ""}`} onClick={onClick}>

              {employee.image 
                  ? <img src={employee.image}/>
                  : <i className="bi bi-person-circle employee-icon"></i>
              } 
              
            <div className="employee-info">
                <h4>{employee.name}</h4>
                <p>{employee.experience} exp</p> 
               
            </div>
              {/**{
                isHome &&(
                    <SeeMoreButton/>
                )
              } */}
        </div>
    );
}

export default EmployeeCard;