import {loginUsuario} from "../services/auth.service.js";

export async function login(req, res){
    const {email, password}= req.body;

    const usuario= await loginUsuario(email, password);

    res.json(usuario);
}