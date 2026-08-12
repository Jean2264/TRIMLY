import SearchBar from "../../components/common/SearchBar";
import "./Employees.css";
function Employees(){
    return(
        <section className="employees">
           <div className="employees-header">
            <SearchBar
            title="Buscar empleado"/>
            <button className="primary-button">
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
                    <th>Telefono</th>
                    <th>Experiencia</th>
                    
                </tr>

                <tbody>
                    <tr>
                        <td>
                            Sin empleados registrados
                        </td>
                        <td colSpan="4">
                            
                        </td>
                    </tr>
                </tbody>
            </thead>
            </table>
           </div>
        </section>
    )
}

export default Employees;