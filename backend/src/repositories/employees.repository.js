import pool from '../config/db.js';


async function  insertEmployee(employeeData) {

const {
    dni,
    nombre,
    apellido,
    telefono,
    experiencia,
    email,
    passwordHash,
    idRol
}= employeeData;

const client= await pool.connect();

try{

    await client.query("BEGIN");

    //1. Crear usuario
    const usuariorResult= await client.query(
        `
        INSERT INTO "Usuario"
        (

            "Email",
            "PasswordHash"
        )
            VALUES  ($1, $2)
            RETURNING "IdUsuario";
        `,
        [email, passwordHash]
    );

    const usuarioId= usuariorResult.rows[0].IdUsuario;


    //2. Crear empleado

    const empleadoResult= await client.query(
        `
         INSERT INTO "Empleado"
         (
            "UsuarioId",
            "IdRol",
            "DNI",
            "Nombre",
            "Apellido",
            "Telefono",
            "Experiencia"
         )
            VALUES ( $1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
        [usuarioId, idRol, dni, nombre, apellido,telefono,experiencia]
    );

    await client.query("COMMIT");

    return empleadoResult.rows[0];
}catch(error){
    await client.query("ROLLBACK");
    throw error;
}finally{
    client.release();
}
    
}