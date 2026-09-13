import { obtenerUsuarioPorMai } from "../repositories/usuario.repository.js";
import bcrypt from "bcrypt";

export async function autenticarUsuario(email, password) {
  const usuario = await obtenerUsuarioPorMail(email);

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
