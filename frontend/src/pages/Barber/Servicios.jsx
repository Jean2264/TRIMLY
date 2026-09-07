import "./Servicios.css";
import SearchBar from "../../components/common/SearchBar";
import { useState } from "react";
import AuxModal from "../../components/common/AuxModal";
import ServicesModal from "../../components/services-barber/ServicesModal";

function Servicios() {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="services">
      <div className="services-header">
        <button
          className="primary-button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <i className="bi bi-plus-lg"></i>
        </button>

        <SearchBar />
      </div>

      {ismodalOpen && (
        <AuxModal
          title="Agregar servicios"
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <ServicesModal />
        </AuxModal>
      )}
    </section>
  );
}
export default Servicios;
