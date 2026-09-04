import {
  createService,
  getServices,
  getServicebyId,
  updateserviceInfo,
  deleteServiceSt,
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
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const services = await getServices(search, page, limit);
    const totalPage = Math.ceil(services.totalRecords / limit);

    res.status(200).json({
      services: services.services,
      tottalRecors: services.totalRecords,
      page,
      limit,
      totalPage,
    });
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

async function updateService(req, res) {
  try {
    const { id } = req.params;

    const serviceData = req.body;

    const result = await updateserviceInfo(id, serviceData);

    if (!result.success) {
      return res.status(404).json({
        erros: result.errors,
      });
    }

    return res.status(200).json({
      message: "Servicio actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar servicio", error);

    return res.status(500).json({
      message: "Error al actualizar el servicio",
    });
  }
}

async function deleteServiceState(req, res) {
  try {
    const { id } = req.params;

    const result = await deleteServiceSt(id);

    if (!result.success) {
      return res.status(404).json({
        errors: result.errors,
      });
    }

    return res.status(200).json({
      message: "servicio dado de baja correctamente",
    });
  } catch (error) {
    console.error("Error al dar de baja empleado", error);

    return res.status(500).json({
      message: "Error al dar de baja el servicio",
    });
  }
}

export {
  createServices,
  getServicesController,
  seeService,
  updateService,
  deleteServiceState,
};
