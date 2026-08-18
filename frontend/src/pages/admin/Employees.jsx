import { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import "./Employees.css";
import AuxModal from "../../components/common/AuxModal";
import EmployeeModal from "../../components/employee-panel/EmployeeModal";
function Employees(){

    const [isEmployeeModalOpen, setIsEmployeeModalOpen]= useState(false);
    const [selectedEmployeeId,setSelectedEmployeeId ] = useState(null);
    const [employeeModalMode, setEmployeeModalMode] = useState(null);
    return(
        <section className="employees">
           <div className="employees-header">
            <SearchBar
            title="Buscar empleado"/>
            <button className="primary-button"
             onClick={()=>{
                    setEmployeeModalMode("create");
                    setIsEmployeeModalOpen(true);
                }}>
                Nuevo empleado
            </button>
           </div>

           <div className="employees-table-wrapper">
            <table className="employees-table">
    <thead>
        <tr>
            
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Experiencia</th>
            <th>Fecha de alta</th>
            <th>Acciones</th>
        </tr>
    </thead>

    <tbody>
         <tr>
        <td>12345678</td>
        <td>Carlos</td>
        <td>Pérez</td>
        <td>11 1234-5678</td>
        <td>5 años</td>
        <td>05/08/2026</td>
        <td>
            <div className="employee-actions">
                <button aria-label="Ver empleado"
                onClick={()=>{
                    setEmployeeModalMode("view");
                    setIsEmployeeModalOpen(true);
                }}
                ><i className="bi bi-eye"></i></button>
                <button aria-label="Editar empleado"
                 onClick={()=>{
                    setEmployeeModalMode("edit");
                    setIsEmployeeModalOpen(true);
                }}
                ><i className="bi bi-pencil-square"></i></button>
                <button aria-label="Eliminar empleado"><i className="bi bi-trash"></i></button>
            </div>
        </td>
    </tr>
    </tbody>
</table>
           </div>
           {isEmployeeModalOpen&&(
            <AuxModal
            title={
                     employeeModalMode === "create"
                    ? "Alta de empleado"
                    : employeeModalMode === "view"
                    ? "Inspección de empleado"
                    : "Edición de empleado"
                }
            onClose={()=> setIsEmployeeModalOpen(false)}>
                <EmployeeModal 
                onClose={()=> setIsEmployeeModalOpen(false)}
                />
            </AuxModal>
           )}
        </section>
    )
}

export default Employees;