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
