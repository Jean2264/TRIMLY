import {
  createService,
  getServices,
  getServicebyId,
} from "../services/services.service.js";

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

async function getServicesController(req, res) {
  try {
    const { search = "", page = 1, limit = 20 } = req.query;

    const result = await getServices(search, Number(page), Number(limit));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener servicios",
    });
  }
}

//mostrar servicio en modal por medio de su id

async function seeService(req, res) {
  try {
    const { id } = req.params;
    const service = await getServicebyId(id);

    if (!service) {
      return res.status(404).json({ message: "servicio no encontradi" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("error al obtener servicio:", error);
    res.status(500).json({ message: "Error al obtener el servicio" });
  }
}

export { createServices, getServicesController, seeService };
