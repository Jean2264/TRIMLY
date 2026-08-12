import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar(){
    return(
        <nav className="admin-sidebar">
            <NavLink to="/admin" className="btn-option">Dashboard
            </NavLink>
            <NavLink to="/admin/employees" className="btn-option">Empleados

            </NavLink>
            <NavLink  to="/admin/clients" className="btn-option">Clientes

            </NavLink>
            <NavLink to="/admin/services" className="btn-option">Servicios

            </NavLink>
            <NavLink to="/admin/appointments" className="btn-option">Turnos
            </NavLink>
        </nav>
    )
}

export default AdminSidebar;