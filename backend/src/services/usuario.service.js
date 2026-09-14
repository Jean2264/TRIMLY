import bcrypt from "bcrypt";
import * as usuarioRepository from "../repositories/usuario.repository.js";

export async function loginUsuario(email, password) {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return {
      ok: false,
      status: 400,
      mensaje: "Email y contraseña obligatorios",
    };
  }

  const emailNormalizado = email.trim().toLowerCase();

  const usuario =
    await usuarioRepository.buscarUsuarioParaLogin(emailNormalizado);
}
