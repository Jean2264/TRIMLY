import SelectEmployee from "./SelectEmployee";
import SelectSchedule from "./SelectSchedule";
import ReservationSuccess from "../../pages/public/ReservationSuccess";
import ConfirmReservation from "./ConfirmReservation";
function StepContent({ currentStep,

    selectedEmployee,
    setSelectedEmployee,

    selectedDay,
    setSelectedDay,
    employees,
    selectedService,

    selectedTime,
    setSelectedTime})
{
   
      switch(currentStep)
      {
        case 1:
        return <SelectEmployee
        
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        employees={employees}
        />

        case 2: 
        return <SelectSchedule
        
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}

        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        />

        case 3:
          return <ConfirmReservation
          selectedDay={selectedDay}
          selectedEmployee={selectedEmployee}
          selectedService={selectedService}
          selectedTime={selectedTime}
          />

          case 4:
          return <ReservationSuccess
          
              selectedEmployee={selectedEmployee}
              selectedService={selectedService}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
          
          />
      }
    
}

export default StepContent;