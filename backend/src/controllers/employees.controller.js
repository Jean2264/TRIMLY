import {
  createEmployee,
  fetchAllEmployees,
  fetchEmployee,
  updateEmployeeInfo,
  deleteEmployeeState,
} from "../services/employees.service.js";

async function createEmployees(req, res) {
  try {
    const result = await createEmployee(req.body);
    if (!result.ok) {
      return res.status(400).json({
        message: "Datos invalidos",
        errors: result.errors,
      });
    }

    res.status(201).json({
      message: "Empleado creado correctamente",
      employee: result.employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear empleado",
    });
  }
}

async function getEmployees(req, res) {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const employees = await fetchAllEmployees(search, page, limit);

    const totalPage = Math.ceil(employees.totalRecords / limit);

    res.status(200).json({
      employees: employees.employees,
      totalRecords: employees.totalRecords,
      page,
      limit,
      totalPage,
    });
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ message: "Error al obtener la lista de empleados" });
  }
}

async function seeEmployee(req, res) {
  try {
    const { id } = req.params; //<-- leo el id desde params
    const employee = await fetchEmployee(id);

    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error al obtener empleado:", error);
    res
      .status(500)
      .json({ message: "Error al obtener la informacion del empleado" });
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;

    const employeeData = req.body;

    const result = await updateEmployeeInfo(id, employeeData);

    if (!result.success) {
      return res.status(404).json({
        errors: result.errors,
      });
    }

    return res.status(200).json({
      message: "Empleado actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar empleado: ", error);

    return res.status(500).json({
      message: "Error al actualizar el empleado",
    });
  }
}

async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;

    const result = await deleteEmployeeState(id);
    if (!result.success) {
      return res.status(404).json({
        errors: result.errors,
      });
    }

    return res.status(200).json({
      message: "Empleado dado de baja correctamente",
    });
  } catch (error) {
    console.error("Error al dar de baja empleado: ", error);

    return res.status(500).json({
      message: "Error al dar de baja al el empleado",
    });
  }
}

export {
  createEmployees,
  getEmployees,
  seeEmployee,
  updateEmployee,
  deleteEmployee,
};
