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
        e."fechaalta",
        u."email"
        FROM "empleado" e 
        INNER JOIN "usuario" u ON e."usuarioid"= u."idusuario"
        ORDER BY e."nombre" ASC;
    `;

    const result= await pool.query(query);

    return result.rows;
}

export async function fetchEmployee(id) {
    
    const query= await pool.query(

        `
    
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

        Where e."idempleado"= $1
    `, [id]
    );

    return query.rows[0];
}

// Update de employee
export async function updateEmployee(employeeId, employeeData) {
    

    //A modo de ejemplo de como verificar duplicidad de DNI entre registros
    /**const dniResult = await client.query(
            `
            SELECT "idempleado"
            FROM "empleado"
            WHERE "dni" = $1
            AND "idempleado" <> $2
            `,
            [dni, employeeId]
        ); */
//El <> $2 significa: "buscame ese DNI, pero ignorá al empleado que estoy editando"

    //Creo cliente de conexion
    const client = await pool.connect();

    try{

        await client.query("BEGIN");

        const {

            telefono,
            experiencia,
            email
        } = employeeData;

        //1. Obtener el UsuarioId del empleado para poder hacer 
        //el UPDATE de la tabla Usuario

        const employeeResult= await client.query(
            `
            SELECT "usuarioid"
            FROM "empleado"
            WHERE "idempleado"= $1
            `,
            [employeeId]
        );

        if(employeeResult.rows.length===0){
            await client.query("ROLLBACK");

            return{
                success: false,
                errors:{
                    general: "Empleado no encontrado"
                }
            };
        }

        const usuarioId= employeeResult.rows[0].usuarioid;

        //2. Verfificar Email duplicado

        const emailResult= await client.query(
            `
            SELECT "idusuario"
            FROM "usuario"
            WHERE "email"= $1
            AND "idusuario" <> $2
            `,
            [email, usuarioId]
        );

        //3. Construir errores
        const errors= {};

        if(emailResult.rows.length>0){
            errors.email ="Ya existe un usuario con ese email."
        }

        //4. Si hay errores -> Rollback
        if(Object.keys(errors).length>0){

            await client.query("ROLLBACK");

            return{
                success:false,
                errors
            };
        }

        //5. Actualizar empleado
        await client.query(
            `
            
            UPDATE "empleado"
            SET
                "telefono"=$1,
                "experiencia"=$2
            WHERE "idempleado"=$3    
            `,
            [
                telefono,
                experiencia,
                employeeId
            ]
        );

        //6. Actualizar usuario
        await client.query(
            `
            
            UPDATE "usuario"
            SET
                "email"=$1
            WHERE "idusuario"=$2
            `,
            [
                email,
                usuarioId
            ]
        );


        //7. Confirmar transaccion
        await client.query("COMMIT");

        return{
            success:true
        };

    }catch(error){
        await client.query("ROLLBACK");

        throw error;
    } finally{
        client.release();
    }
}


export async function  deleteEmployee(employeeId) {
    
    const client= await pool.connect();
    try{


        await client.query("BEGIN");


        //1. Obtener el id del usuario
       
        const employeeResult= await client.query(`
            
            SELECT "usuarioid"
            FROM "empleado"
            WHERE "idempleado"=$1
            `,[employeeId]
        );

        if(employeeResult.rows.length===0){
            await client.query("ROLLBACK");

            return{
                success: false,
                errors:{
                    general:"Empleado no encontrado"
                }
            }
        }

        
        const usuarioId= employeeResult.rows[0].usuarioid;


        
        //2. dar de baja empleado
        await client.query(
            `
            UPDATE "empleado"
            SET "estado"=FALSE
            WHERE "idempleado"=$1
            `, [employeeId]
        );

        //3. dar de baja usuario
        await client.query(`
            
            UPDATE "usuario"
            SET "estado"= FALSE
            WHERE "idusuario"=$1
            `,[usuarioId]);

        //4. confirmar COMMIT

    await client.query("COMMIT");

    return{
        success:true
    };

    
    }catch(error){
        await client.query("ROLLBACK");

        throw error;
    }finally{
       client.release();
    }
}