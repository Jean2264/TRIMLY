import bcrypt from "bcrypt";
import crypto from "crypto";
import {insertEmployee} from "../repositories/employees.repository.js";


function generateTemporaryPassword(){
    return crypto.randomBytes(6).toString("base64url");
}

function ValidateEmployeeData(employeeData){
    const errors= {};

    // DNI
    if (!/^\d{8}$/.test(employeeData.dni)) {
        errors.dni = "El DNI debe tener exactamente 8 dígitos.";
    }

    // Nombre
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,100}$/.test(employeeData.nombre)) {
        errors.nombre = "El nombre debe contener solamente letras y tener como máximo 100 caracteres.";
    }

    // Apellido
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{1,100}$/.test(employeeData.apellido)) {
        errors.apellido = "El apellido debe contener solamente letras y tener como máximo 100 caracteres.";
    }

    //telefono
    if(!/^\d{10,15}$/.test(employeeData.telefono)){
        errors.telefono = "El teléfono debe tener entre 10 y 15 dígitos.";
    }

    //experiecia
    if(!/^\d{1,3}$/.test(employeeData.experiencia)){
         errors.experiencia = "La experiencia debe contener solamente números y tener como máximo 3 dígitos.";
    }

// Email
    if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(employeeData.email)) {
        errors.email = "Ingresá un email válido.";
    }

    return errors;
}

export async function createEmployee(employeeData) {
    
    const errors = ValidateEmployeeData(employeeData);

    if(Object.keys(errors).length>0){
        return {
            ok:false,
            errors
        };
    }

    //2. generar contrasenia temporal
    const temporaryPassword = generateTemporaryPassword();

    //3. generar hash
    const passwordHash= await bcrypt.hash(temporaryPassword,10);

    //4. rol barbero
    const idRol=2;


    //5. preparar informacion para el repository
    const employeeInsert={
        ...employeeData,
        passwordHash,
        idRol
    }

    //6. Crear usuario + empleado
    const employee= await insertEmployee(employeeInsert);

    console.log("Datos recibidos por el service:", employeeData);
    return{
        ok:true,
        employee,
        temporaryPassword
    };
}