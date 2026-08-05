import "./Greeting.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function Greeting()
{
    const {user}= useContext(AuthContext);
    
    const hora = new Date().getHours();
    let saludo = "";


if(hora >= 6 && hora < 12){
    saludo = "Buenos días ☀️";
}
else if(hora >= 12 && hora < 19){
    saludo = "Buenas tardes";
}
else{
    saludo = "Buenas noches 🌙";
}
    return(
        <div className="greeting">
            {user?.perfil?.nombre && (
    <p>
        Hola, {
        user.perfil.nombre.charAt(0).toUpperCase() +
        user.perfil.nombre.slice(1)
        } 👋
    </p>
)}

            <h2>{saludo}</h2>
        </div>
    )
}

export default Greeting;