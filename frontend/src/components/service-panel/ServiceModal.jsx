import "./ServiceModal.css";

import { useState, useEffect } from "react";

import ServiceImageload from "../serviceImageload/ServiceImageload";

function ServiceModal({ serviceId, mode, onClose, onServiceSaved }) {
  const [formData, setFormData] = useState({
    nombre: "",
    costo: "",
    duracion: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");

  //**convertir duracion a minutos */
  function convertDurationToMinutes(duration) {
    if (!duration) {
      return null;
    }

    //Formato HH:MM
    if (duration.includes(":")) {
      const [horas, minutos] = duration.split(":");

      const horasNumero = Number(horas);
      const minutosNumero = Number(minutos);

      if (isNaN(horasNumero) || isNaN(minutosNumero) || minutosNumero >= 60) {
        return null;
      }

      return horasNumero * 60 + minutosNumero;
    }

    //solamente minutos
    const minutosTotales = Number(duration);

    if (isNaN(minutosTotales) || minutosTotales < 0) {
      return null;
    }
    return minutosTotales;
  }

  /**
   * Validacion y actualización de campos
   */
  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    // Nombre y descripcion
    if (name === "nombre" || name === "descripcion") {
      newValue = value.replace(/[^a-zA-Z0-9\s,+.]/g, "");

      //permitir solamente una coma
      const partes = newValue.split(",");
      if (partes.length > 2) {
        newValue = partes[0] + "," + partes[1];
      }

      //maximo dos decimales
      if (partes.length === 2) {
        newValue = partes[0] + "," + partes[1].slice(0, 2);
      }

      newValue = newValue.slice(0, 15);
    }

    //duracion
    if (name === "costo") {
      newValue = value.replace(/[^0-9.,]/g, "").slice(0, 15);
    }

    //duracion
    if (name === "duracion") {
      newValue = value.replace(/[^0-9]/g, "");

      //permitir solamente un ":"
      const partes = newValue.split(":");

      if (partes.length > 2) {
        newValue = partes[0] + ":" + partes[1];
      }

      //maximo 3 digitos en cada parte
      if (partes.length === 2) {
        newValue = partes[0].slice(0, 2) + ":" + partes[1].slice(0, 3);
      } else {
        newValue = newValue.slice(0, 4);
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  }

  /**
   * Envío del formulario
   */
  async function handleSubmit(e) {
    e.preventDefault();

    setGeneralError("");
    setErrors({});

    const duracionEnMinutos = convertDurationToMinutes(formData.duracion);

    const costoNumerico = Number(formData.costo.replace(",", "."));

    const serviceData = {
      ...formData,
      duracion: duracionEnMinutos,
      costo: costoNumerico,
    };

    try {
      const isEdit = mode === "edit";

      const url = isEdit
        ? `http://localhost:3000/services/${serviceId}`
        : `http://localhost:3000/services`;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      // Error del servidor
      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }

        setGeneralError(data.message || "Error al guardar el servicio");

        return;
      }

      // Éxito
      setIsSubmitted(true);

      if (onServiceSaved) {
        onServiceSaved();
      }

      // Cerrar modal despues de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error al guardar el servicio:", error);

      setGeneralError("Error al guardar el servicio");
    }
  }

  return (
    <div className="service-modal">
      {isSubmited ? (
        /**mensaje de exito */
        <div className="succes-message">
          <div className="status-icon-correct">
            <i className="bi bi-check-circle-fill"></i>
          </div>

          <h3>
            {mode === "edit"
              ? "¡Servicio actualizado correctamente!"
              : "¡Servicio creado correctamente!"}
          </h3>
        </div>
      ) : (
        // ==========================================
        // formulario de creacion/edicion de servicio
        // ==========================================
        <form onSubmit={handleSubmit} className="service-form">
          <section className="service-information">
            <h3>Información del servicio</h3>

            <label className="service-label">
              <span>
                Nombre del servicio
                <span className="span-required">*</span>
              </span>

              <input
                className="service-input"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />

              {errors.nombre && (
                <span className="field-error">{errors.nombre}</span>
              )}
            </label>

            <label className="service-label">
              <span>
                Costo del servicio
                <span className="span-required">*</span>
              </span>

              <input
                className="service-input"
                type="text"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
              />

              {errors.costo && (
                <span className="field-error">{errors.costo}</span>
              )}
            </label>

            <label className="service-label">
              <span>Descripción del servicio</span>

              <input
                className="service-input"
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />

              {errors.descripcion && (
                <span className="field-error">{errors.descripcion}</span>
              )}
            </label>

            <label className="service-label">
              <span>
                Duración del servicio
                <span className="span-required">*</span>
              </span>

              <input
                className="service-input"
                type="text"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
              />

              {errors.duracion && (
                <span className="field-error">{errors.duracion}</span>
              )}
            </label>

            {/* ================================
                IMAGEN
            ================================= */}
            <label className="service-label">
              <span>Imagen del servicio</span>

              <ServiceImageload />
            </label>

            {generalError && (
              <div className="general-error">{generalError}</div>
            )}
          </section>

          <div className="form-actions">
            <button className="cancelar" type="button" onClick={onClose}>
              Cancelar
            </button>

            <button className="guardar" type="submit">
              Guardar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ServiceModal;
