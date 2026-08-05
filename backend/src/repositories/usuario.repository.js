import pool from '../config/db.js';

export async function obtenerUsuarios(){
    const resultado= await pool.query(
        "SELECT * FROM Usuario"
    );

    return resultado.rows;
}


export async function obtenerUsuarioPorEmail(email){

    const result = await pool.query(
       `Select 
        u.IdUsuario,
        u.Email,
        u.Estado,
        u.passwordhash,
        c.IdCliente,
        c.Nombre,
        c.Apellido,
        c.Foto
        

        from Usuario u
        left join Cliente c on u.IdUsuario=c.IdCliente
       
       where Email=$1`, [email]
    );
    return result.rows[0];
}