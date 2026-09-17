import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  insertEmployee,
  getAllEmployees,
  fetchEmployee as getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../repositories/employees.repository.js";
import { enviarCorreoActivacion } from "./email.service.js";

function generateTemporaryPassword() {
  return crypto.randomBytes(6).toString("base64url");
}

//Genero el token para la activacion de cuenta
function generarActivationData() {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  return {
    token,
    tokenHash,
    expiresAt,
  };
}

function validateEmployeeData(employeeData) {
  const errors = {};

  const { dni, nombre, apellido, telefono, experiencia, email } = employeeData;

  if (!/^\d{8}$/.test(dni)) {
    errors.dni = "El DNI debe tener exactamente 8 dígitos.";
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,100}$/.test(nombre)) {
    errors.nombre =
      "El nombre debe contener solamente letras y tener como máximo 100 caracteres.";
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,100}$/.test(apellido)) {
    errors.apellido =
      "El apellido debe contener solamente letras y tener como máximo 100 caracteres.";
  }

  if (!/^\d{10,15}$/.test(telefono)) {
    errors.telefono = "El teléfono debe tener entre 10 y 15 dígitos.";
  }

  if (!/^\d{1,3}$/.test(String(experiencia))) {
    errors.experiencia =
      "La experiencia debe contener solamente números y tener como máximo 3 dígitos.";
  }

  if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    errors.email = "Ingresá un email válido.";
  }

  return errors;
}

export async function createEmployee(employeeData) {
  const errors = validateEmployeeData(employeeData);

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  //2. generar contrasenia temporal
  const temporaryPassword = generateTemporaryPassword();

  //3. generar hash
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);
  const activationData = generarActivationData();

  //4. rol barbero
  const idRol = 2;

  //5. preparar informacion para el repository
  const employeeInsert = {
    ...employeeData,
    passwordHash,
    idRol,
    tokenActivacionHash: activationData.tokenHash,
    tokenActivacionExpiraEn: activationData.expiresAt,
  };

  //6. Crear usuario + empleado
  const employee = await insertEmployee(employeeInsert);
  let correoEnviado = false;
  try {
    await enviarCorreoActivacion(employeeData.email, activationData.token);
    correoEnviado = true;
  } catch (error) {
    console.error(
      "El empleado fue creado, pero no se puedo enviar el correo de activacion: ",
      error.message,
    );
  }

  console.log("Datos recibidos por el service:", employeeData);
  return {
    ok: true,
    employee,
    correoEnviado,
  };
}

export async function fetchAllEmployees(search, page = 1, limit = 20) {
  const employees = await getAllEmployees(search, page, limit);

  return employees;
}
//renombro la importacion de nombre para prevenir conflicto de redundancia
export async function fetchEmployee(id) {
  const employee = await getEmployeeById(id);
  return employee;
}

export async function updateEmployeeInfo(employeeId, employeeData) {
  const employee = await updateEmployee(employeeId, employeeData);
  return employee;
}

export async function deleteEmployeeState(employeeId) {
  const employee = await deleteEmployee(employeeId);
  return employee;
}
