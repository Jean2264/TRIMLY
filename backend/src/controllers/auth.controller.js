import { autenticarUsuario } from "../services/usuario.service";

export async function login(req, res) {
  try {
    const { mail, password } = req.body;

    const usuario = await autenticarUsuario(mail, password);

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
