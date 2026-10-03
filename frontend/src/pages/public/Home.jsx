import HomeTop from "../../sections/HomeTop";
import ServiceCaroucel from "../../components/services/ServiceCarrousel";
import EmployeeCaroucel from "../../components/employees/EmployeeCaroucel";
import Footer from "../../components/common/Footer";
import "./Home.css";
import BusinessInfo from "../../components/common/BusinessInfo";
import BusinessGallery from "../../components/common/BusinessGallery";
import LocationSection from "../../components/common/LocationSection";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ScheduleCard from "../../components/scheduled/ScheduleCard";
import ContactSection from "../../components/common/ContactSection";

export const schedule = [
  {
    day: "Domingo",
    open: false,
    hours: null,
  },
  {
    day: "Lunes",
    open: true,
    hours: "09:00 - 21:00",
  },
  {
    day: "Martes",
    open: true,
    hours: "09:00 - 21:00",
  },
  {
    day: "Miércoles",
    open: true,
    hours: "09:00 - 21:00",
  },
  {
    day: "Jueves",
    open: true,
    hours: "09:00 - 21:00",
  },
  {
    day: "Viernes",
    open: true,
    hours: "09:00 - 21:00",
  },
  {
    day: "Sábado",
    open: true,
    hours: "10:00 - 18:00",
  },
];

export const services = [
  {
    id: 1,
    name: "Corte clásico",
    duration: 45,
    price: 8000,
  },
  {
    id: 2,
    name: "Corte + Barba",
    duration: 60,
    price: 12000,
  },
  {
    id: 3,
    name: "Barba",
    duration: 30,
    price: 6000,
  },
  {
    id: 4,
    name: "Corte + Barba + Cejas",
    duration: 75,
    price: 15000,
  },
];

export const employees = [
  {
    id: 1,
    name: "Tomás",
    specialty: "Barbero",
  },
  {
    id: 2,
    name: "Lucas",
    specialty: "Peluquero",
  },
  {
    id: 3,
    name: "Martín",
    specialty: "Barbero y estilista",
  },
  {
    id: 4,
    name: "Nicolás",
    specialty: "Barbero",
  },
];

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".home-scroll");

    if (!scrollContainer) return;

    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 0);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const handleEmployeeClick = (employee) => {
    navigate("/employee", {
      state: {
        employee,
        currentStep: 2,
      },
    });
  };

  const handleServiceClick = (service) => {
    navigate("/reservation", {
      state: {
        service,
        employees,
        currentStep: 1,
        flow: "service",
      },
    });
  };

  return (
    <div className="home">
      <HomeTop isScrolled={isScrolled} />

      <main className="home-scroll">
        <div className="home-page-content">
          <BusinessGallery />

          <div className="home-content">
            <section id="businessInfo" className="home-section">
              <BusinessInfo />
            </section>

            <section id="servicios" className="home-section">
              <div className="home-section-header">
                <h2>Servicios</h2>

                <NavLink to="/services" className="see-more-button">
                  Ver todos
                </NavLink>
              </div>

              <ServiceCaroucel
                services={services}
                onServiceClick={handleServiceClick}
              />
            </section>

            <section id="equipo" className="home-section">
              <div className="home-section-header">
                <h2>Equipo</h2>

                <NavLink to="/equipo" className="see-more-button">
                  Ver todos
                </NavLink>
              </div>

              <EmployeeCaroucel employees={employees} />
            </section>

            <section id="ubicacion" className="home-section">
              <div className="home-section-header">
                <h2>Ubicación</h2>
              </div>

              <LocationSection />
            </section>
            <section id="horarios" className="home-section">
              <div className="home-section-header">
                <h2>Horarios de atencion</h2>
              </div>
              <ScheduleCard schedule={schedule} />
            </section>

            <section id="contacto" className="home-section">
              <div className="home-section-header">
                <h2>Contacto</h2>
              </div>

              <ContactSection />
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Home;
