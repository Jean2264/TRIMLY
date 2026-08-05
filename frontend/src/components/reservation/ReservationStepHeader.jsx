import "./ReservationStepHeader.css";

function ReservationStepHeader({currentStep})
{
    return(
        <div className="reservation-header">
            <p>Paso {currentStep} de 4</p>
            
            <h2>
              {currentStep === 1 && "Elige tu empleado"}
              {currentStep === 2 && "Elige fecha y horario"}
              {currentStep === 3 && "Confirma tu reserva"}
              {currentStep === 4 && "Reserva confirmada con éxito"}
            </h2>

        </div>
    );
}
export default ReservationStepHeader;