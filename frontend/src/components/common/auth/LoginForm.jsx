import "./LoginForm.css";
import Logo from "../Logo";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { login } from "../../../api/auth.api";

function LoginForm({onRegister})
{
    const [showPassword, setShowPassword]= useState(false);
   
    const [error, setError] = useState("");

    const [email, setEmail]= useState("");

    const [password, setPassword]= useState("");
    const { login: saveUser, setIsAuthModalOpen } = useContext(AuthContext);
    async function handleLogin(event){
        event.preventDefault();

       const result= await login(email, password);

       if(result.ok){
        setError("");
        saveUser(result.usuario);
        setIsAuthModalOpen(false);
       } else{
        setError(result.mensaje);
       }
    }
    return(
        <div className="login-form">
            <Logo/>

            <div className="login-header">
                <h3>Iniciar sesión</h3>
                <p>Bienvenido nuevamente</p>
            </div>

            <form className="login-body" onSubmit={handleLogin}>

                <label htmlFor="username">Correo electrónico</label>
                <input className="input" id="username" type="text" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Contraseña</label>
                <div className="pass-group">                   
                    <input
                         id="password"
                          type={showPassword? "text" : "password"}
                           placeholder="Ingrese su contraseña"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />

                   <button
                         type="button"
                         className="ojo"
                         onClick={() => setShowPassword(!showPassword)}
                     >
                         <i
                             className={
                                 showPassword
                                 ? "bi bi-eye-slash"
                                 : "bi bi-eye"
                             }
                         />
                     </button>
                                          
                </div>

              {error && <span role="alert">{error}</span>}

                <button className="btn-login" type="submit">Iniciar sesion</button>

                <a className="pass" href="#">¿Olvidaste tu contraseña?</a>

               
            </form>
            <div className="login-footer">

                <p>
                     ¿No tienes una cuenta? <span
    className="link-button"
    onClick={onRegister}
>
    Registrarse
</span>
                   </p>
            </div>
        </div>
    )
}

export default LoginForm;