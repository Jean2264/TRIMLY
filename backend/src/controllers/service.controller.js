import { createService } from "../services/services.service.js";

async function createServices(req, res) {
  try {
    const result = await createService(req.body);

    if (!result.ok) {
      return res.status(400).json({
        message: "Datos invalidos",
        errors: result.errors,
      });
    }

    res.status(201).json({
      message: "Servicio creado correctamente",
      service: result.service,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear servicio",
    });
  }
}

export { createServices };
