import bcrypt from "bcrypt";
import crypto from "crypto";

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

//activamos la cuenta
export async function activarCuenta(token, password, foto = null) {
  if (typeof token !== "string" || token.trim() === "") {
    return {
      ok: false,
      status: 400,
      mensaje: "Token de activación obligatorio",
    };
  }

  if (typeof password !== "string" || password.trim() === "") {
    return {
      ok: false,
      status: 400,
      mensaje: "La contraseña es obligatoria",
    };
  }

  if (password.length < 8 || password.length > 20) {
    return {
      ok: false,
      status: 400,
      mensaje:
        "La contraseña debe tener al menos 8 caracteres y como maximo 20 caracteres",
    };
  }

  //convertir el token recibido en SHA-256
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  //buscar el usuario relacionado con ese token

  const usuario =
    await usuarioRepository.buscarUsuarioPorTokenActivacion(tokenHash);

  if (!usuario) {
    return {
      ok: false,
      status: 400,
      mensaje: "EL enlase de activacion no es valida",
    };
  }

  if (!usuario.usuarioActivo) {
    return {
      ok: false,
      status: 403,
      mensaje: "El usuario está inactivo",
    };
  }

  if (usuario.cuentaActivada) {
    return {
      ok: false,
      status: 400,
      mensaje: "La cuenta ya fue activada",
    };
  }

  const fechaExpiracion = new Date(usuario.tokenActivacionExpiraEn);

  if (
    Number.isNaN(fechaExpiracion.getTime()) ||
    fechaExpiracion <= new Date()
  ) {
    return {
      ok: false,
      status: 400,
      mensaje: "El enlace de activación expiró",
    };
  }

  //Hasehar la contrasenia elegida por el empleado
  const passwordHash = await bcrypt.hash(password, 10);

  //Actualizar la cuenta en la db
  const usuarioActivado = await usuarioRepository.activarUsuario({
    idUsuario: usuario.idUsuario,
    passwordHash,
    foto,
  });

  if (!usuarioActivado) {
    return {
      ok: false,
      status: 500,
      mensaje: "No se pudo activar la cuenta",
    };
  }

  return {
    ok: true,
    status: 200,
    usuario: {
      ...usuario,
      ...usuarioActivado,
      foto,
    },
  };
}
