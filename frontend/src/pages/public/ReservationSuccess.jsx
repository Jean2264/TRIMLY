import ReservationSummary from "../../components/reservation/ReservationSummary";
import "./ReservationSuccess.css";
function ReservationSuccess({
    selectedEmployee,
    selectedService,
    selectedDay,
    selectedTime})
{

    return(
       <div className="reservation-seccess">
       <div className="h">
         <h2>
                ¡Felicidades!
            </h2>

            <p>
                Tu reserva fue confirmada correctamente.
            </p>

       </div>

            <ReservationSummary
                selectedEmployee={selectedEmployee}
                selectedDay={selectedDay}
                selectedService={selectedService}
                selectedTime={selectedTime}
                variant="confirmation"
            />
       </div>
    )
}
export default ReservationSuccess;