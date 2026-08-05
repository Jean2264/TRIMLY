import "./ReservationNavegation.css"
import { useNavigate } from "react-router-dom";

function ReservationNavegation({
    currentStep, setCurrentStep,
    selectedEmployee, selectedService,selectedDay,
    flow,
    selectedTime})
{
    const navigate= useNavigate();

   const shouldHidePrevious = currentStep === 4   ;

    function handleNext()
    {
        if(currentStep<4)
        {
            setCurrentStep(currentStep+1);
        }

        if(currentStep===4)
        {
            navigate("/");
            return;
        }
    }
    function handlePrevious() {
        //vengo desde Home (Servicios)
    if (flow==="service" && currentStep === 1) {
        navigate("/");
        return;
    }


    //vengo desde employeeProfile
    if(flow==="employee" && currentStep===2)
    {
        navigate("/employee", {
            state:{
                employee: selectedEmployee,
                currentStep:2
            }
        });
        return;
    }

    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
    }
}

    //funcion decide que hace el boton "siguente"
    function canNext()
    {
        if(currentStep===1)
        {
            return selectedEmployee !==null;
        }

        if(currentStep===2)
        {
            return(
                selectedDay !== null &&
                selectedTime !== null
            );
        }

      
        return true;
    }


   return(
    <div 
        className={`reservation-navegation
        ${shouldHidePrevious ? "only-next" : ""}
        ${currentStep === 4 ? "success-navigation" : ""}`}
    >
        
       {!shouldHidePrevious && (
    <button onClick={handlePrevious}>
        Anterior
    </button>
)}
       

        <button className="btn-next"
            onClick={handleNext}
            disabled={!canNext()}
        >
            {
                currentStep===3 
                ? "Confirmar reserva"
                : currentStep===4 
                ? "Volver al inicio" 
                : "Siguiente"
            }
        </button>
       
    </div>
)
}


export default ReservationNavegation;