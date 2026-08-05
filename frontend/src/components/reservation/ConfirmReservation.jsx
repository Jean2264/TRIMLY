import ReservationSummary from "./ReservationSummary";

function ConfirmReservation({
   
    selectedEmployee,
    selectedService,
selectedDay,
selectedTime
})
{

    return(

        <div className="confirm-reservation">
            <ReservationSummary
            selectedEmployee={selectedEmployee}
            selectedService={selectedService}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            variant="confirmation"
            />
        </div>
    )
}

export default ConfirmReservation;