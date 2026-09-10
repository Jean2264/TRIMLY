import {
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorMail,
} from "../repositories/usuario.repository.js";
import bcrypt from "bcrypt";

export async function autenticarUsuario(mail, password) {
  const usuario = await obtenerUsuarioPorMail(mail);

  if (!usuario) {
    throw new Error("Credenciales invalidos");
  }

  if (!usuario.estado) {
    throw new Error("Usuario inactivo");
  }

  if (!usuario.cuentaactivada) {
    throw new Error("Cuenta no activada");
  }

  const passwordValida = await bcrypt.compare(password, usuario.passwordhash);

  if (!passwordValida) {
    throw new Error("Credenciales invalidos");
  }
  return usuario;
}
