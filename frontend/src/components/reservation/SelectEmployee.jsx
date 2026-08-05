import EmployeeCard from "../employees/EmployeeCard";
import "./SelectEmployee.css";




function SelectEmployee({selectedEmployee, setSelectedEmployee, employees})
{
    return(
        <div className="select-employee">

            {employees.map(employee => (

                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    selected={selectedEmployee?.id === employee.id}
                    onClick={() => setSelectedEmployee(employee)}
                />

            ))}

        </div>
    )
}

export default SelectEmployee;