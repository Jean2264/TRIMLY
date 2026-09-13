import { autenticarUsuario } from "../services/usuario.service.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const usuario = await autenticarUsuario(email, password);

    res.status(200).json({
      mensaje: "Inicio sesion correcto",
      usuario,
    });
  } catch (error) {
    res.status(401).json({
      mensaje: error.message,
    });
  }
}
