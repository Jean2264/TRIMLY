import { autenticarUsuario } from "../services/usuario.service.js";
import { generarToken } from "../config/jwt.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const usuario = await autenticarUsuario(email, password);

    const payload = {
      idUsuario: usuario.idusuario,
      idEmpleado: usuario.idempleado,
      idCliente: usuario.idcliente,
      idRol: usuario.idrol,
      rol: usuario.rol,
    };

    const token = generarToken(payload);

    res.status(200).json({
      mensaje: "Inicio sesion correcto",
      token,
      usuario: {
        idUsuario: usuario.idusuario,
        email: usuario.email,
        idEmpleado: usuario.idempleado,
        idCliente: usuario.idcliente,
        idRol: usuario.idrol,
        nombreEmpleado: usuario.nombreempleado,
        apellidoEmpleado: usuario.apellidoempleado,
        nombreCliente: usuario.nombrecliente,
        apellidoCliente: usuario.apellidocliente,
        foto: usuario.foto,
      },
    });
  } catch (error) {
    res.status(401).json({
      mensaje: error.message,
    });
  }
}
