import "./Reservation.css";
import HomeTop from "../../sections/HomeTop";
import ReservationSummary from "../../components/reservation/ReservationSummary";
import ReservationStep from "../../components/reservation/ReservationStep";
import Footer from "../../components/common/Footer";
import ReservationNavegation from "../../components/reservation/ReservationNavegation";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Reservation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".reservation-scroll");

    if (!scrollContainer) return;

    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 0);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { state } = useLocation();
  const employees = state?.employees ?? [];

  const flow = state?.flow ?? "service";

  const [currentStep, setCurrentStep] = useState(state?.currentStep ?? 1);
  const [selectedEmployee, setSelectedEmployee] = useState(
    state?.employee ?? null,
  );
  const [selectedService, setSelectedService] = useState(
    state?.service ?? null,
  );

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="reservation">
      <header></header>
      <main className="reservation-scroll">
        <div className="reservation-content">
          {currentStep < 3 && (
            <section>
              <ReservationSummary
                selectedEmployee={selectedEmployee}
                selectedService={selectedService}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
              />
            </section>
          )}

          <section
            className={
              currentStep === 3 || currentStep === 4 ? "confirm-section" : ""
            }
          >
            <ReservationStep
              currentStep={currentStep}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              selectedService={selectedService}
              employees={employees}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </section>

          <ReservationNavegation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            selectedEmployee={selectedEmployee}
            selectedService={selectedService}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            flow={flow}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Reservation;
