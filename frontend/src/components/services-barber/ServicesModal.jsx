import "./ServicesModal.css";
import SearchBar from "../common/SearchBar";
import ServiceSelectCard from "../../pages/Barber/ServiceSelectCard";
function ServicesModal() {
  return (
    <div className="services-modal">
      <div className="services-modal-header">
        <SearchBar />
      </div>

      <form className="frm">
        <section className="services-modal-option">
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
          <ServiceSelectCard />
        </section>
        <button className="primary-button">agregar</button>
      </form>
    </div>
  );
}

export default ServicesModal;
