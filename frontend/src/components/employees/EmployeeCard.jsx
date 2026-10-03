import "./EmployeeCard.css";

function EmployeeCard({ employee, selected, onClick, variant = "home" }) {
  return (
    <div
      className={`employee-card ${variant} ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {employee.image ? (
        <img src={employee.image} alt={employee.name} />
      ) : (
        <i className="bi bi-person-circle employee-icon"></i>
      )}

      <div className="employee-info">
        <span>{employee.name}</span>
        <p>{employee.specialty}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
