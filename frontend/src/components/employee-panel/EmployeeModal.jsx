import "./EmployeeModal.css";
import BtnClose from "../common/BtnClose";

function EmployeeModal({title}){
        return(
            <div className="employee-modal">

               
                <h2>{title}</h2>
                <form>
                    <section className="employee-information">
                        <h3>Información del empleado</h3>

                        <label>
                            DNI
                            <input className="inputt" type="text"/>
                        </label>

                        <label>
                            Nombre
                            <input className="inputt" type="text"/>
                        </label>

                        <label>
                            Apellido
                            <input className="inputt" type="text"/>
                        </label>

                        <label>
                            Teléfono
                            <input className="inputt" type="text"/>
                        </label>

                        <label>
                            Experiencia
                            <input className="inputt" type="text"/>
                        </label>
                    </section>

                    <section className="account-information">
                        <h3>Información de la cuenta</h3>

                        <label>
                            Email
                            <input className="inputt" type="email"/>
                        </label>
                    </section>
                    <div className="form-actions">
                        <button className="cancelar" type="button">Cancelar</button>
                        <button className="guardar" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        )
}

export default EmployeeModal;