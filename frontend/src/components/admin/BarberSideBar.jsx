import { NavLink } from "react-router-dom";
import "./BarberSidebar.css";

function BarberSideBar() {
  return (
    <nav className="admin-sidebar">
      <NavLink to="/barber/turnos" className="btn-option">
        Mis turnos
      </NavLink>
      <NavLink to="/barber/agenda" className="btn-option">
        Mi agenda
      </NavLink>
      <NavLink to="/barber/turnos" className="btn-option">
        Mis turnos
      </NavLink>
      <NavLink to="/barber/horarios" className="btn-option">
        Mis horarios
      </NavLink>
      <NavLink className="btn-option">Cerrar sesión</NavLink>
    </nav>
  );
}

export default BarberSideBar;
