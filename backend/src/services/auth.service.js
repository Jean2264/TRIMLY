import {obtenerUsuarioPorEmail} from "../repositories/usuario.repository.js";


export async function loginUsuario(email, password){

    const usuario = await obtenerUsuarioPorEmail(email);
    console.log(usuario);
    if(!usuario)
    {
        return {
            ok: false,
            mensaje: "Usuario o contraseña incorrectos"
        };
    }


    if(usuario.estado === false)
    {
        return {
            ok: false,
            mensaje: "Usuario deshabilitado"
        };
    }


    if(usuario.passwordhash !== password)
    {
        return {
            ok: false,
            mensaje: "Usuario o contraseña incorrectos"
        };
    }


   return {
    ok: true,
    usuario: {
        idusuario: usuario.idusuario,
        email: usuario.email,
        estado: usuario.estado,
        perfil: {
            id: usuario.idcliente,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        foto: usuario.foto
        }
    }
};
}