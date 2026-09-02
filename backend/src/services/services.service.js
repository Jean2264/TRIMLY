import {
  insertService,
  getAllServices,
  fetchService,
  updateService,
  deleteService,
} from "../repositories/services.repository.js";

function validateServiceData(serviceData) {
  const errors = {};
  const { nombre, descripcion, costo, duracion } = serviceData;

  // Validar nombre
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    errors.nombre = "El nombre del servicio es obligatorio.";
  }
  // Validar descripcion
  if (
    !descripcion ||
    typeof descripcion !== "string" ||
    descripcion.trim() === ""
  ) {
    errors.descripcion = "La descripción del servicio es obligatoria.";
  }
  // Validar costo
  if (!costo || typeof costo !== "number" || costo <= 0) {
    errors.costo =
      "El costo del servicio es obligatorio y debe ser un número positivo.";
  }
  // Validar duracion
  if (!duracion || typeof duracion !== "number" || duracion <= 0) {
    errors.duracion =
      "La duración del servicio es obligatoria y debe ser un número positivo.";
  }

  return errors;
}

export async function createService(serviceData) {
  const { nombre, descripcion, costo, foto, duracion } = serviceData;

  const errors = validateServiceData(serviceData);

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  const result = await insertService({
    nombre,
    descripcion,
    costo,
    foto,
    duracion,
  });

  return {
    ok: true,
    service: result,
  };
}
