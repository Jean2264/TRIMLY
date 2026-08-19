import pool from '../config/db.js';


export async function  insertEmployee(employeeData) {

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
        INSERT INTO "usuario"
        (

            "email",
            "passwordhash"
        )
            VALUES  ($1, $2)
            RETURNING "idusuario";
        `,
        [email, passwordHash]
    );

    const usuarioId= usuariorResult.rows[0].idusuario;


    //2. Crear empleado

    const empleadoResult= await client.query(
        `
         INSERT INTO "empleado"
         (
            "usuarioid",
            "idrol",
            "dni",
            "nombre",
            "apellido",
            "telefono",
            "experiencia"
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

//Mostrar empleados
export async function getAllEmployees() {
    
    const query=`
    
    SELECT
        e."idempleado",
        e."dni",
        e."nombre",
        e."apellido",
        e."telefono",
        e."experiencia",
        u."email"
        FROM "empleado" e 
        INNER JOIN "usuario" u ON e."usuarioid"= u."idusuario"
        ORDER BY e."nombre" ASC;
    `;

    const result= await pool.query(query);

    return result.rows;
}