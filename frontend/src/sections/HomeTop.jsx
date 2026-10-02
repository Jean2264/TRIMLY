import "./HomeTop.css";
import Header from "../components/common/Header";
import SearchBar from "../components/common/SearchBar";

function HomeTop() {
  return (
    <section className="top-section">
      <Header>
        <div className="header-center">
          <SearchBar title="Buscar servicios o barberos..." />

          <nav className="home-navegation">
            <a href="#servicios">Servicios</a>
            <a href="#Equipo">Equipo</a>
            <a href="#ubicacion">Ubicación</a>
            <a href="#horarios">Horarios</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </Header>
    </section>
  );
}

export default HomeTop;
