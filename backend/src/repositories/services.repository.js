import pool from "../config/db";

/**Metodo para insertar un servicio */
export async function insertService(serviceData) {
  const { nombre, descripcion, costo, foto, duracion } = serviceData;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const serviceResult = await client.query(
      `
            INSERT INTO "servicio"
            (
                "nombre",
                "descripcion",
                "costo",
                "foto",
                "duracion"
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING "idservicio";
            `,
      [nombre, descripcion, costo, foto, duracion],
    );

    const serviceId = serviceResult.rows[0].idservicio;

    const codServicio = `C${String(serviceId).padStart(3, "0")}`;

    const updateResult = await client.query(
      `
            UPDATE "servicio"
            SET "codservicio" = $1
            WHERE "idservicio" = $2
            RETURNING *;
            `,
      [codServicio, serviceId],
    );

    await client.query("COMMIT");

    return updateResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}

/**Metodo para mostrar listade servicios y paginacion inluida y tambien acepta filtrado de ser necesario */
export async function getAllServices(search = "", page = 1, limit = 20) {
  /**de claro el salto de registros para cada busqueda */
  const offset = (page - 1) * limit;

  const searchValue = `%${search}%`;

  const query = `
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
    ORDER BY "nombre" ASC
    LIMIT $2
    OFFSET $3;
    `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM "servicio" 
    WHERE "estado"= TRUE
    AND (
        "nombre" ILIKE $1
        OR "descripcion" ILIKE $1
    );
    `;

  const [serviceResult, countResult] = await Promise.all([
    pool.query(query, [searchValue, limit, offset]),
    pool.query(countQuery, [searchValue]),
  ]);

  const totalRecords = Number(countResult.rows[0].total);

  return {
    services: serviceResult.rows,
    totalRecords,
    page,
    limit,
  };
}

/**Metodo para obtener un servicio especifico */
export async function fetchService(id) {
  const query = `
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
  const { nombre, descripcion, costo, foto, duracion } = serviceData;

  const query = `
        UPDATE "servicio"
        SET
            "nombre" = $1,
            "descripcion" = $2,
            "costo" = $3,
            "foto" = $4,
            "duracion" = $5
        WHERE "idservicio" = $6;
    `;

  await pool.query(query, [
    nombre,
    descripcion,
    costo,
    foto,
    duracion,
    serviceId,
  ]);

  return {
    success: true,
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
    success: true,
  };
}
