import HomeTop from "../../sections/HomeTop";
import ServiceCaroucel from "../../components/services/ServiceCarrousel";
import EmployeeCaroucel from "../../components/employees/EmployeeCaroucel";
import ScheduleCard from "../../components/scheduled/ScheduleCard";
import ContactSection from "../../components/contacts/ContactSection";
import Footer from "../../components/common/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import Location from "../../components/common/location";

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
      <main className="home-container">
        <HomeTop />
        <h1>este es home</h1>
      </main>
    </div>
  );
}

export default Home;
