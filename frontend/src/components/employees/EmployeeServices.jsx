import EmployeeServiceCard from "./EmployeeServiceCard";
import "./EmployeeServices.css";



function EmployeeServices({selectedService, setSelectedService, services, employee}){

    
    return(
        <div className="employee-service-container">
            <h3>Especialidades de {employee.name}</h3>
        <div className="employee-services">
           
           {
            services.map(serv=>
            (
                <EmployeeServiceCard
                key={serv.id}
                service={serv}
                selected={selectedService?.id===serv.id}
                onClick={()=>setSelectedService(serv)}

                />
            )

             )
           }
        </div>
        </div>

    )

}


export default EmployeeServices;