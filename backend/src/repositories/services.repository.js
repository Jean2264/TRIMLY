import pool from "../config/db";

/**Metodo para insertar un servicio */
export async function insertService(serviceData) {
    
    /**las columnas que necesitamos del front */
    const {
        nombre,
        descripcion,
        costo,
        foto,
        duracion
    }= serviceData;

    /**La consulta */
    const query=`
    INSERT INTO "servicio"
    (
        "nombre",
        "descripcion",
        "costo",
        "foto",
        "duracion"
    ) VALUES( $1, $2, $3, $4, $5)
     RETURNING *;
    `;

    const result = await pool.query(query, [
        nombre,
        descripcion,
        costo,
        foto,
        duracion
    ]);

    return result.rows[0];
}

/**Metodo para mostrar listade servicios y paginacion inluida y tambien acepta filtrado de ser necesario */
export async function getAllServices(search="", page=1, limit=20) {
    /**de claro el salto de registros para cada busqueda */
    const offset= (page-1)* limit;

    const searchValue= `%${search}%`;

    const query=`
    SELECT
        "idservicio",
        "nombre",
        "descripcion",
        "costo",
        "foto",
        "estado",
        "duracion",
        "fechaalta"
    FROM "servicio"
    WHERE "estado" = TRUE
    AND (
        "nombre" ILIKE $1
        OR "descripcion" ILIKE $1
    )
    ORDER BAY "nombre" ASC
    LIMIT $2
    OFFSET $3;
    `;

    const countQuery=`
    SELECT COUNT(*) AS total
    FROM "servicio" 
    WHERE "estado"= TRUE
    AND (
        "nombre" ILIKE $1
        OR "descripcion" ILIKE $1
    );
    `;

    const [serviceResult, countResult]= await Promise.all([
        pool.query(query, [searchValue, limit, offset]),
        pool.query(countQuery, [searchValue])
    ]);

    const totalRecords =
    Number(countResult.rows[0].total);

    return{
        service: serviceResult.rows,
        totalRecords,
        page,
        limit
    };
}


/**Metodo para obtener un servicio especifico */
export async function fetchServicie(id) {
    
    const query=`
    SELECT  
        "idservicio",
        "nombre",
        "descripcion",
        "costo",
        "foto",
        "estado",
        "duracion",
        "fechaalta"
    FROM "servicio"
    WHERE "idservicio" = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}



/**Metodo para modificar un servicio */
export async function updateService(serviceId, serviceData) {
    
    const {
        descripcion,
        costo,
        foto,
        duracion
    }= serviceData;

    const query=`
    UPDATE "servicio"
    SET
        "nombre"=$1,
        "descripcion"=$2,
        "costo"=$3,
        "foto"=$4,
        "duracion"=$5
    WHERE "idservicio"= $6;
    `;


    await pool.query(query, [
        descripcion,
        costo,
        foto,
        duracion,
        serviceId
    ]);

    return{
        success: true
    };
}

/**Metodo para dar de baja a un servicio */
export async function deleteService(serviceId) {

    const query = `
        UPDATE "servicio"
        SET "estado" = FALSE
        WHERE "idservicio" = $1;
    `;

    await pool.query(query, [serviceId]);

    return {
        success: true
    };
}