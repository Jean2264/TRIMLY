import "./ReservationSummary.css";

function ReservationSummary({selectedDay, selectedTime,selectedEmployee,selectedService, variant=""})
{
    return(
        <div className={`reservation-summary ${variant}`}>

          
            <p>
                <strong>Servicio:</strong> {selectedService?.name}
            </p>
            <p>
                <strong>Empleado:</strong> {selectedEmployee?.name ?? "-"}
            </p>
             <p>
                <strong>Fecha:</strong> {selectedDay ?? "-"}
            </p>
             <p>
                <strong>Hora:</strong> {selectedTime ?? "-"}
            </p>
             <p>
                <strong>Duracion estimado</strong> {selectedService?.time}
            </p>
             <p>
                <strong>Precio:</strong> {selectedService?.price}
            </p>
        </div>
    )
}

export default ReservationSummary;