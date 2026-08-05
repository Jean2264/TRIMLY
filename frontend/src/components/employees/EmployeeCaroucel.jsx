import EmployeeCard from "./EmployeeCard";
import "./EmployeeCaroucel.css"
import SeeMoreButton from "../common/SeeMoreButton";


function EmployeeCaroucel({employees, onEmployeeClick})
{
   
    return(

        <div className="Employee-Caroucel">

            <div className="Employee-track">
              {employees.map(employee =>
                (
                    <EmployeeCard
                    key={employee.id}
                    
                    employee={employee}
                    onClick={() => onEmployeeClick(employee)}
                    />
                )
              )}
            </div>
            
        </div>
    );
}

export default EmployeeCaroucel;