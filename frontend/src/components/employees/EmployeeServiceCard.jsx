import "./EmployeeServiceCard.css";

function EmployeeServiceCard({service, selected, onClick})
{
     
    return(
        <div className={`employee-service-card ${selected? "selected": ""}`} onClick={onClick}>
            <h3>{service.name}</h3>
            <p className="time">{service.time} min</p>
            <p>${service.price}</p>
        </div>
    )
}

export default EmployeeServiceCard;