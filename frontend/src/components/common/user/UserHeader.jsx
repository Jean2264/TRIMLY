import "./UserHeader.css";
import { useContext } from "react";
import {usestate} from "react";
import { AuthContext } from "../../../context/AuthProvider";

function UserHeader(){
    const { user } = useContext(AuthContext);
    console.log(user.perfil.email);
    return(
       <div className="user-header">
           <div className="user-avatar">
            {user?.perfil?.foto ?(
                <img src={user.perfil.foto} alt={user.perfil.nombre} />
            ):(
                <span>{user.perfil.nombre.charAt(0).toUpperCase()}</span>
            )}
           </div>
            <h2>¡Hola, {user.perfil.nombre}!</h2>
            <p>{user.email}</p>
        </div>

    )
}

export default UserHeader;