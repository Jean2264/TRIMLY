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

  if (!usuario) {
    return {
      ok: false,
      status: 401,
      mensaje: "Credenciales inválidas",
    };
  }

  if (!usuario.usuarioActivo) {
    return {
      ok: false,
      status: 403,
      mensaje: "El usuario está inactivo",
    };
  }

  if (!usuario.cuentaActivada) {
    return {
      ok: false,
      status: 403,
      mensaje: "La cuenta no está activada",
    };
  }

  const passwordCorrecta = await bcrypt.compare(password, usuario.passwordHash);

  if (!passwordCorrecta) {
    return {
      ok: false,
      status: 401,
      mensaje: "Credenciales inválidas",
    };
  }

  return {
    ok: true,
    status: 200,
    usuario,
  };
}
