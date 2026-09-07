import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar({ onClose }) {
  return (
    <nav className="admin-sidebar">
      <NavLink to="/admin" className="btn-option" onClick={onClose}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/employees" className="btn-option" onClick={onClose}>
        Empleados
      </NavLink>

      <NavLink to="/admin/services" className="btn-option" onClick={onClose}>
        Servicios
      </NavLink>
      <NavLink to="/admin/clients" className="btn-option" onClick={onClose}>
        Clientes
      </NavLink>

      <NavLink
        to="/admin/appointments"
        className="btn-option"
        onClick={onClose}
      >
        Turnos
      </NavLink>
    </nav>
  );
}

export default AdminSidebar;
