import { useState, useEffect } from "react";
import SearchBar from "../../components/common/SearchBar";
import "./Employees.css";
import AuxModal from "../../components/common/AuxModal";
import EmployeeModal from "../../components/employee-panel/EmployeeModal";
import Pagination from "../../components/common/Pagination";
import DataTable from "../../components/common/DataTable";

const employeeColumns=[
    {
        header:"DNI",
        accessor: "dni"
    },
    {
        header:"Nombre",
        accessor: "nombre"
    },
    {
        header:"Apellido",
        accessor: "apellido"
    },
    {
        header:"Teléfono",
        accessor: "telefono"
    },
    {
        header:"Experiencia",
        accessor: "experiencia"
    },
    {
        header:"Fecha de alta",
        accessor: "fechaalta",
        render: (emp)=>
            emp.fechaalta ? new Date(emp.fechaalta).toLocaleDateString("es-AR") : "-"
    }
];

function Employees(){

    const [isEmployeeModalOpen, setIsEmployeeModalOpen]= useState(false);
    const [selectedEmployeeId,setSelectedEmployeeId ] = useState(null);
    const [employeeModalMode, setEmployeeModalMode] = useState(null);
    const [employees, setEmployees]= useState([]);
    const [page, setPage]= useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchInput, setSearchInput]= useState("");
    const [search, setSeacrh]= useState("");
    

    const [isDeleteModalOpen, setIsDeleteModalOpen]= useState(false);
    const [deleteResult, setDeleteResult]= useState(null);

    //1. peticion GET
   const loadEmployees = async () => {
    try {
        const response = await fetch(
            `http://localhost:3000/employees?search=${encodeURIComponent(search)}&page=${page}&limit=2`
        );

        const data = await response.json();

        if (response.ok) {
            setEmployees(data.employees);
            setTotalPages(data.totalPage);
            setTotalRecords(data.totalRecords);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error("Error cargando empleados:", error);
    }
};

    //2. cargar los datos al montar el componente
    useEffect(()=>{
        loadEmployees();
    },[page, search]);



    //Funcion para dar de baja a empleado
    const deleteEmployee= async ()=>{
        try{

            const response= await fetch(`http://localhost:3000/employees/${selectedEmployeeId}`,
                {method: "DELETE",
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            );


            const data= await response.json();

            if(response.ok){
                setDeleteResult("success");
                await loadEmployees();
                return;
            }

            if(response.status===400){
                setDeleteResult("error");
                console.error(data);
                return;
            }

            if(response.status===401)
            {
                setDeleteResult("error");
                console.error("No autorizado");
                return;
            }

            if(response.status===500)
            {
                setDeleteResult("error");
                console.error("Error del servidor");
                return;
            }
        }catch(error){
        console.error("Error al dar de baja", error);
        setDeleteResult("error");
    }
    }

    const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteResult(null);
};

    return(
        <section className="employees">
           <div className="employees-header">
            <SearchBar
            title="Buscar empleado"
            value={searchInput}
            onChange={setSearchInput}
            onSearch={()=>{
                setSeacrh(searchInput)
                setPage(1)
            }}
            />
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
                            {emp.fechaalta? new Date(emp.fechaalta).toLocaleDateString("es-AR"): "-"}
                        </td>
                        <td>
            <div className="employee-actions">
                <button aria-label="Ver empleado"
                onClick={()=>{
                    setSelectedEmployeeId(emp.idempleado);
                    setEmployeeModalMode("view");
                    setIsEmployeeModalOpen(true);
                }}
                ><i className="bi bi-eye"></i></button>


                <button aria-label="Editar empleado"
                 onClick={()=>{
                    setSelectedEmployeeId(emp.idempleado);
                    setEmployeeModalMode("edit");
                    setIsEmployeeModalOpen(true);
                }}
                ><i className="bi bi-pencil-square"></i></button>

                <button aria-label="Eliminar empleado"
                onClick={()=>{
                    setSelectedEmployeeId(emp.idempleado);
                    setIsDeleteModalOpen(true);
                }}
                ><i className="bi bi-trash"></i></button>
            </div>
        </td>
                    </tr>
            ))
        )}
        
        
    
    </tbody>
</table>
           </div>

           <div className="nav">
            <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            />
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
                employeeId={selectedEmployeeId}
                mode={employeeModalMode}
                onClose={()=> setIsEmployeeModalOpen(false)}
                onEmployeeSaved={loadEmployees}
                />
            </AuxModal>
           )}
           {isDeleteModalOpen &&(
            <AuxModal
            title="Dar de baja empleado"
            onClose={closeDeleteModal}>
                {deleteResult=== null ?(
                    <div className="delete-confirmation">
                    <p>
                        ¿Estás seguro de que querés dar de baja este empleado?
                    </p>


                    <div className="form-actions">
                        <button
                        className="cancelar"
                        type="button"
                        onClick={closeDeleteModal}>
                            Cancelar
                        </button>

                        <button
                        className="guardar"
                        type="button"
                        onClick={deleteEmployee}>
                                Dar de baja
                        </button>
                    </div>
                </div>
                ): deleteResult === "success" ?(
                    <div className="delete-success">
                        <div className="status-icon-correct">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <p>El empleado fue dado de baja correctamente.</p>

                       
                    </div>
                ):(
                    <div className="delete-error">
                        <div className="status-icon-incorrect">
                            <i className="bi bi-x-circle-fill"></i>
                        </div>
                            <p>No se pudo dar de baja al empleado.</p>
                    </div>
                )}
            </AuxModal>
           )}
        </section>
    )
}

export default Employees;