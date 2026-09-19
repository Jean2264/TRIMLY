import * as usuarioService from "../services/usuario.service.js";

import { generarToken } from "../config/jwt.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const resultado = await usuarioService.loginUsuario(email, password);

    if (!resultado.ok) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje,
      });
    }

    const usuario = resultado.usuario;

    const payload = {
      idUsuario: usuario.idUsuario,
      idEmpleado: usuario.idEmpleado,
      idCliente: usuario.idCliente,
      idRol: usuario.idRol,
      rol: usuario.rol,
    };

    const token = generarToken(payload);

    return res.status(200).json({
      mensaje: "Inicio de sesión correcto",
      token,
      usuario: {
        idUsuario: usuario.idUsuario,
        email: usuario.email,
        idEmpleado: usuario.idEmpleado,
        idCliente: usuario.idCliente,
        idRol: usuario.idRol,
        rol: usuario.rol,
        nombreEmpleado: usuario.empleadoNombre,
        apellidoEmpleado: usuario.empleadoApellido,
        nombreCliente: usuario.clienteNombre,
        apellidoCliente: usuario.clienteApellido,
        foto: usuario.empleadoFoto ?? usuario.clienteFoto ?? null,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
}

export async function activarCuenta(req, res) {
  try {
    const { token, password, foto } = req.body;

    const resultado = await usuarioService.activarCuenta(token, password, foto);

    if (!resultado.ok) {
      return res.status(resultado.status).json({
        mensaje: resultado.mensaje,
      });
    }

    return res.status(200).json({
      mensaje: "Cuenta activada correctamente",
      usuario: resultado.usuario,
    });
  } catch (error) {
    console.error("Error al activar cuenta:", error);

    return res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
}
