import pool from "../config/db.js";

export async function buscarUsuarioParaLogin(email) {
  const resultado = await pool.query(
    `
      SELECT
        u.IdUsuario AS "idUsuario",
        u.Email AS "email",
        u.PasswordHash AS "passwordHash",
        u.Estado AS "usuarioActivo",
        u.CuentaActivada AS "cuentaActivada",

        c.IdCliente AS "idCliente",
        c.Nombre AS "clienteNombre",
        c.Apellido AS "clienteApellido",
        c.Foto AS "clienteFoto",

        e.IdEmpleado AS "idEmpleado",
        e.IdRol AS "idRol",
        e.Nombre AS "empleadoNombre",
        e.Apellido AS "empleadoApellido",
        e.Foto AS "empleadoFoto",

        r.Nombre AS "rol"
      FROM Usuario u
      LEFT JOIN Cliente c ON c.UsuarioId = u.IdUsuario
      LEFT JOIN Empleado e ON e.UsuarioId = u.IdUsuario
      LEFT JOIN Rol r ON r.IdRol = e.IdRol
      WHERE u.Email = $1
    `,
    [email],
  );

  return resultado.rows[0] ?? null;
}

export async function buscarUsuarioPorTokenActivacion(tokenHash) {
  const resultado = await pool.query(
    `
    SELECT
    u."idusuario" AS "idUsuario",
    u."email" AS "email",
    u."passwordhash" AS "passwordHash",
    u."estado" AS "usuarioActivo",
    u."cuentaactivada" AS "cuentaActivada",
    u."tokenactivacionexpiraen" AS "tokenActivacionExpiraEn",

    e."idempleado" AS "idEmpleado",
    e."nombre" AS "nombre",
    e."apellido" AS "apellido",
    e."foto" AS "foto",
    e."idrol" AS "idRol",
    r."nombre" AS "rol"

    FROM "usuario" u

    LEFT JOIN "empleado" e
    ON e."usuarioid" = u."idusuario"

    LEFT JOIN "rol" r
    ON r."idrol" = e."idrol"
    
    WHERE u."tokenactivacionhash" = $1
    `,
    [tokenHash],
  );

  return resultado.rows[0] ?? null;
}

export async function activarUsuario({ idUsuario, passwordHash, foto }) {
  const resultado = await pool.query(
    `
    
    UPDATE "usuario"
    SET
      "passwordhash"= $1,
      "cuentaactivada"=TRUE,
      "tokenactivacionhash"= NULL,
      "tokenactivacionexpiraen" = NULL

      WHERE "idusuario" = $2
      RETURNING
        "idusuario" AS "idUsuario",
        "email" AS "email",
        "estado" AS "usuarioActivado",
        "cuentaactivada" AS "cuentaActivada"

    `,
    [passwordHash, idUsuario],
  );

  if (resultado.rows.length === 0) {
    return null;
  }

  if (foto !== undefined) {
    await pool.query(
      `
      UPDATE "empleado"
      SET "foto"= $1
      WHERE "usuarioid" = $2
      `,
      [foto, idUsuario],
    );
  }

  return resultado.rows[0];
}
