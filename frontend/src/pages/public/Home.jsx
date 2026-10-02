import HomeTop from "../../sections/HomeTop";
import ServiceCaroucel from "../../components/services/ServiceCarrousel";
import EmployeeCaroucel from "../../components/employees/EmployeeCaroucel";
import ScheduleCard from "../../components/scheduled/ScheduleCard";
import ContactSection from "../../components/contacts/ContactSection";
import Footer from "../../components/common/Footer";
import "./Home.css";
import BusinessInfo from "../../components/common/BusinessInfo";
import BusinessGallery from "../../components/common/BusinessGallery";
import LocationSection from "../../components/common/LocationSection";
import { useNavigate } from "react-router-dom";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import Location from "../../components/common/location";

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
      <HomeTop />

      <main className="home-scroll">
        <BusinessGallery />

        <div className="home-content">
          <section id="businessInfo" className="home-section">
            <BusinessInfo />
          </section>

          <section id="servicios" className="home-section">
            <h2>Servicios</h2>
            <ServiceCaroucel
              services={services}
              onServiceClick={handleServiceClick}
            />
            <SeeMoreButton text="Ver todos los servicios" link="/services" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
