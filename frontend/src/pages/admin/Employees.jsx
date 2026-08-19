import { useState, useEffect } from "react";
import SearchBar from "../../components/common/SearchBar";
import "./Employees.css";
import AuxModal from "../../components/common/AuxModal";
import EmployeeModal from "../../components/employee-panel/EmployeeModal";
function Employees(){

    const [isEmployeeModalOpen, setIsEmployeeModalOpen]= useState(false);
    const [selectedEmployeeId,setSelectedEmployeeId ] = useState(null);
    const [employeeModalMode, setEmployeeModalMode] = useState(null);
    const [employees, setEmployees]= useState([]);

    //1. peticion GET
    const loadEmployees= async ()=>{
        try{
            const response= await fetch("http://localhost:3000/employees");

            if(response.ok){
                const data= await response.json();
                setEmployees(data);
            }
        }catch(error){
            console.error("Error cargando empleados", error);
        }
    }

    //2. cargar los datos al montar el componente
    useEffect(()=>{
        loadEmployees();
    },[]);

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

            {/**Tabla empleados */}
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
        {employees.length===0? (
             <tr>
                <td colSpan="7" style={{textAlign: "center"}}>
                    No hay empleados registrados.
                </td>
                </tr>
        ):(
            employees.map((emp)=>(
                <tr key={emp.idempleado || emp.dni}>
                        <td>{emp.dni}</td>
                        <td>{emp.nombre}</td>
                        <td>{emp.apellido}</td>
                        <td>{emp.telefono}</td>
                        <td>{emp.experiencia} años</td>
                        <td>
                            {emp.fecha_alta? new Date(emp.fecha_alta).toLocaleDateString("es-AR"): "-"}
                        </td>
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
            ))
        )}
        
        
    
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
                onEmployeeCreated={loadEmployees}
                />
            </AuxModal>
           )}
        </section>
    )
}

export default Employees;