import pool from "../config/db.js";

export async function obtenerUsuarioPorMail(mail) {
  const resultado = await pool.query(
    `
    SELECT
      u."idusuario",
      u."email",
      u."passwordhash",
      u."estado",
      u."cuentaactivada",

      e."idempleado",
      e."idrol",
      e."nombre" AS "nombreempleado",
      e."apellido" AS "apellidoempleado",

      r."nombre" AS "rol",

      c."idcliente",
      c."nombre" AS "nombrecliente",
      c."apellido" AS "apellidocliente",
      c."foto"

    FROM "usuario" u

    LEFT JOIN "empleado" e
      ON u."idusuario" = e."usuarioid"

    LEFT JOIN "rol" r
      ON e."idrol" = r."idrol"

    LEFT JOIN "cliente" c
      ON u."idusuario" = c."usuarioid"

    WHERE u."email" = $1
  `,
    [mail],
  );

  return resultado.rows[0];
}
