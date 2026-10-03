import "./HomeTop.css";
import Header from "../components/common/Header";
import SearchBar from "../components/common/SearchBar";

function HomeTop({ isScrolled }) {
  return (
    <section className={`top-section ${isScrolled ? "scrolled" : ""}`}>
      <div className="top-section-content">
        <Header>
          <div className="header-center">
            <SearchBar title="Buscar servicios o barberos..." />

            <nav className="home-navegation">
              <a href="#servicios">Servicios</a>
              <a href="#equipo">Equipo</a>
              <a href="#ubicacion">Ubicación</a>
              <a href="#horarios">Horarios</a>
              <a href="#contacto">Contacto</a>
            </nav>
          </div>
        </Header>
      </div>
    </section>
  );
}

export default HomeTop;
