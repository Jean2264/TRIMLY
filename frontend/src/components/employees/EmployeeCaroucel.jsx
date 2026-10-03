import EmployeeCard from "./EmployeeCard";
import "./EmployeeCaroucel.css";

function EmployeeCaroucel({ employees, variant = "home", onEmployeeClick }) {
  return (
    <div className="Employee-Caroucel">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          variant={variant}
          employee={employee}
          onClick={() => onEmployeeClick(employee)}
        />
      ))}
    </div>
  );
}

export default EmployeeCaroucel;
