import "./EmployeeModal.css";
import BtnClose from "../common/BtnClose";
import { useState } from "react";

function EmployeeModal({title, onClose}){

    const [formData, setFormData]= useState({
        dni:"",
        nombre:"",
        apellido:"",
        telefono:"",
        experiencia:"",
        email:""
    });
    
    const [errors, setErrors]= useState({});

    function handleChange(e) {
    const { name, value } = e.target;

    let newValue= value;

    if(name==="dni"){
        newValue= value.replace(/\D/g, "").slice(0,8);
    }

    if(name==="nombre" || name==="apellido")
    {
        newValue= value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, "").slice(0,100);
    }

    if(name==="telefono"){
        newValue= value.replace(/\D/g, "").slice(0,15);

    }

     if (name === "experiencia") {
        newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "email") {
        newValue = value.replace(/[^A-Za-z0-9._@-]/g, "");
    }


    setFormData({
        ...formData,
        [name]: newValue
    });

    setErrors({
        ...errors,
        [name]: ""
    });
}

   async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/employees",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(!response.ok){
                setErrors(data.errors);
                return;
            }
            console.log(data);
        } catch(error){
            console.error("Error al crear empleado:", error);
        }
    }
        return(
            <div className="employee-modal">

               
               
                <form onSubmit={handleSubmit}>
                    <section className="employee-information">
                        <h3>Información del empleado</h3>

                        <label>
                            <span className="label-text">
                            DNI <span className="span-required">*</span>
                            </span>
                            <input className="inputt" type="text"
                            name= "dni"
                            value={formData.dni}
                            onChange={handleChange}
                            />
                            {errors.dni && <p className="input-error">{errors.dni}</p>}
                        </label>

                        <label>
                            <span className="label-text">
                            Nombre <span className="span-required">*</span>
                            </span>
                            <input className="inputt" type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}/>
                            {errors.nombre && <p className="input-error">{errors.nombre}</p>}
                        </label>

                        <label>
                            <span className="label-text">
                            Apellido <span className="span-required">*</span>
                            </span>
                            <input className="inputt" type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}/>
                            {errors.apellido && <p className="input-error">{errors.apellido}</p>}
                        </label>

                        <label>
                            <span className="label-text">
                            Telefono <span className="span-required">*</span>
                            </span>
                            <input className="inputt" type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}/>
                            {errors.telefono && <p className="input-error">{errors.telefono}</p>}
                        </label>

                        <label>
                            <span className="label-text">
                            Experiencia <span className="span-required">*</span>
                            </span>
                            <input className="inputt" type="text"
                            name="experiencia"
                            value={formData.experiencia}
                            onChange={handleChange}/>
                            {errors.experiencia && <p className="input-error">{errors.experiencia}</p>}
                        </label>
                    </section>

                    <section className="account-information">
                        <h3>Información de la cuenta</h3>

                        <label>
                            <span className="label-text">
                            Email <span className="span-required">*</span>
                            </span>
                            <input className="inputt" type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}/>
                            {errors.email && <p className="input-error">{errors.email}</p>}
                        </label>
                    </section>
                    <div className="form-actions">
                        <button className="cancelar" type="button" onClick={onClose}>Cancelar</button>
                        <button className="guardar" type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        )
}

export default EmployeeModal;