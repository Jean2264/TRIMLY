import { NavLink } from "react-router-dom";
import "./BarberSidebar.css";

function BarberSideBar({ onClose }) {
  return (
    <nav className="admin-sidebar">
      <NavLink to="/barber" className="btn-option">
        Inicio
      </NavLink>
      <NavLink to="/barber/reservas" className="btn-option" onClick={onClose}>
        Mis reservas
      </NavLink>
      <NavLink
        to="/barber/disponibles"
        className="btn-option"
        onClick={onClose}
      >
        Mis disponibles
      </NavLink>
      <NavLink to="/barber/horarios" className="btn-option">
        Mis horarios
      </NavLink>
      <NavLink to="/barber/servicios" className="btn-option">
        Mis servicios
      </NavLink>
      <NavLink className="btn-option">Cerrar sesión</NavLink>
    </nav>
  );
}

export default BarberSideBar;
