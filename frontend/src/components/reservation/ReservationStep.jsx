import ReservationStepHeader from "./ReservationStepHeader";

import StepContent from "./StepContent";
import "./ReservationStep.css"

function ReservationStep({currentStep,
    selectedEmployee,
    setSelectedEmployee,

    selectedDay,
    setSelectedDay,

    employees,

    selectedService,

    selectedTime,
    setSelectedTime})
{
    return(
        <div className={`reservation-step ${currentStep===3 ? "confirm-step" : ""}`}>
            <ReservationStepHeader 
            currentStep={currentStep}
            />
            <StepContent 
            currentStep= {currentStep}
            
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}

            selectedService={selectedService}
            employees={employees}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}

            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            />
            
        </div>
    )
}

export default ReservationStep;