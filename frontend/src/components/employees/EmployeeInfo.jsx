import "./EmployeeInfo.css";

function EmployeeInfo({employee})
{
    return(
        <div className="employee-info">

    <h2>{employee.name}</h2>

    <p className="employee-role">
        Empleado Profesional
    </p>

    <p className="employee-experience">
       {employee.experience}
    </p>

</div>
    )
}

export default EmployeeInfo;