import "./EmployeeModal.css";
import BtnClose from "../common/BtnClose";
import { useState, useEffect } from "react";

function EmployeeModal({ employeeId, mode, onClose, onEmployeeSaved }) {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    telefono: "",
    experiencia: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [generalError, setGeneralError] = useState("");

  async function loadEmployee() {
    try {
      const responde = await fetch(
        `http://localhost:3000/employees/${employeeId}`,
      );

      const data = await responde.json();

      if (!responde.ok) {
        console.error(data.message);
        return;
      }

      setFormData({
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        experiencia: data.experiencia,
        email: data.email,
      });
    } catch (error) {
      console.error("Error al obtener empleado", error);
    }
  }

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      loadEmployee();
    }
  }, [mode, employeeId]);

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "dni") {
      newValue = value.replace(/\D/g, "").slice(0, 8);
    }

    if (name === "nombre" || name === "apellido") {
      newValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, "").slice(0, 100);
    }

    if (name === "telefono") {
      newValue = value.replace(/\D/g, "").slice(0, 15);
    }

    if (name === "experiencia") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "email") {
      newValue = value.replace(/[^A-Za-z0-9._@-]/g, "");
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");

    try {
      const isEdit = mode === "edit";

      const url = isEdit
        ? `http://localhost:3000/employees/${employeeId}`
        : `http://localhost:3000/employees`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }

        setGeneralError(data.message || "No se pudo crear el empleado");

        return;
      }

      //Exito
      setIsSubmited(true);
      if (onEmployeeSaved) {
        onEmployeeSaved();
      }

      //Cerramos despues de 2 segundos

      setTimeout(() => {
        onClose();
      }, 2000);

      console.log(data);
    } catch (error) {
      console.error("Error al crear empleado:", error);
      //si falla la red o el servidor esta apagadado
      setGeneralError(
        "Ocurrió un error al conectar con el servidor. Intentá de nuevo.",
      );
    }
  }

  /**ACA EMPIEZA EL COMPONENTE */
  return (
    <div className="employee-modal">
      {isSubmited ? (
        <div className="succes-message">
          <div className="status-icon-correct">
            <i className="bi bi-check-circle-fill"></i>
          </div>

          <h3>
            {mode === "edit"
              ? "¡Empleado actualizado correctamente!"
              : "¡Empleado creado correctamente!"}
          </h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/**si hay un error general, muestro este banner arriba */}
          {generalError && (
            <div className="succes-message">
              <div className="status-icon-incorrect">
                <i className="bi bi-x-circle-fill"></i>
              </div>
              <p>{generalError}</p>
            </div>
          )}

          <section className="employee-information">
            <h3>Información del empleado</h3>

            <label className="labell">
              <span className="label-text">
                DNI{" "}
                {mode === "create" && <span className="span-required">*</span>}
              </span>
              <input
                className={`inputt ${mode !== "create" ? "inputt-readonly" : ""}`}
                type="text"
                name="dni"
                readOnly={mode !== "create"}
                value={formData.dni}
                onChange={handleChange}
              />
              {errors.dni && <p className="input-error">{errors.dni}</p>}
            </label>

            <label className="labell">
              <span className="label-text">
                Nombre
                {mode === "create" && <span className="span-required">*</span>}
              </span>
              <input
                className={`inputt ${mode !== "create" ? "inputt-readonly" : ""}`}
                type="text"
                name="nombre"
                readOnly={mode !== "create"}
                value={formData.nombre}
                onChange={handleChange}
              />
              {errors.nombre && <p className="input-error">{errors.nombre}</p>}
            </label>

            <label className="labell">
              <span className="label-text">
                Apellido
                {mode === "create" && <span className="span-required">*</span>}
              </span>
              <input
                className={`inputt ${mode !== "create" ? "inputt-readonly" : ""}`}
                type="text"
                name="apellido"
                readOnly={mode !== "create"}
                value={formData.apellido}
                onChange={handleChange}
              />
              {errors.apellido && (
                <p className="input-error">{errors.apellido}</p>
              )}
            </label>

            <label className="labell">
              <span className="label-text">
                Telefono
                {(mode === "create" || mode === "edit") && (
                  <span className="span-required">*</span>
                )}
              </span>
              <input
                className={`inputt ${mode === "view" ? "inputt-readonly" : ""}`}
                type="text"
                name="telefono"
                readOnly={mode === "view"}
                value={formData.telefono}
                onChange={handleChange}
              />
              {errors.telefono && (
                <p className="input-error">{errors.telefono}</p>
              )}
            </label>

            <label className="labell">
              <span className="label-text">
                Experiencia
                {(mode === "create" || mode === "edit") && (
                  <span className="span-required">*</span>
                )}
              </span>
              <input
                className={`inputt ${mode === "view" ? "inputt-readonly" : ""}`}
                type="text"
                name="experiencia"
                readOnly={mode === "view"}
                value={formData.experiencia}
                onChange={handleChange}
              />
              {errors.experiencia && (
                <p className="input-error">{errors.experiencia}</p>
              )}
            </label>
          </section>

          <section className="account-information">
            <h3>Información de la cuenta</h3>

            <label className="labell">
              <span className="label-text">
                Email
                {(mode === "create" || mode === "edit") && (
                  <span className="span-required">*</span>
                )}
              </span>
              <input
                className={`inputt ${mode === "view" ? "inputt-readonly" : ""}`}
                type="email"
                name="email"
                readOnly={mode === "view"}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="input-error">{errors.email}</p>}
            </label>
          </section>
          {mode !== "view" && (
            <div className="form-actions">
              <button className="cancelar" type="button" onClick={onClose}>
                Cancelar
              </button>
              <button className="guardar" type="submit">
                Guardar
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default EmployeeModal;
