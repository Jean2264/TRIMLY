import "./RegisterForm.css";
import Logo from "../Logo";
import { useState } from "react";
function RegisterForm({onLogin})
{
    const [showPassword, setShowPassword]= useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        {/**const [error, setError]= useState(""); */}
        const [error] = useState("*Usuario o contraseña incorrecto");
    return(
        <div className="register-form">
             <Logo/>

             <div className="register-header">
                <h3>Crear cuenta</h3>
                <p>Únete a Trimly y agenda tus turnos fácilmente.</p>
             </div>
             <form className="register-body">
                <p className="requeride">Completa todos los campos marcados con (<span className="span-requeride">*</span>) para poder registrarte</p>
                <div className="name-full-name">
                     <div className="name">
                           <label htmlFor="username">Nombre<span className="span-requerided">*</span></label>
                           <input className="input" id="username" type="text" placeholder="Ingrese su nombre"/>
     
                     </div>

                     <div className="full-name">
                         <label htmlFor="fullname">Apellido<span className="span-requerided">*</span></label>
                         <input className="input" id="fullname" type="text" placeholder="Ingrese su apellido"/>
     
                     </div>    
                </div>
                <label htmlFor="username">Usuario<span className="span-requerided">*</span></label>
                <input className="input" id="username" type="text" placeholder="Ingrese un nombre de usuario"/>

                <label htmlFor="email">Correo electrónico<span className="span-requerided">*</span></label>
                <input
                    className="input"
                    id="email"
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                />

                <label htmlFor="password">Contraseña<span className="span-requerided">*</span></label>
                <div className="pass-group">                   
                    <input
                         id="password"
                          type={showPassword? "text" : "password"}
                           placeholder="Ingrese su contraseña"
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

                {/**confirmar contrasenia */}
                <label htmlFor="password">Confirmar contraseña<span className="span-requeride">*</span></label>
                <div className="pass-group">                   
                    <input
                         id="password"
                          type={showConfirmPassword? "text" : "password"}
                           placeholder="Confirme  su contraseña"
                    />

                   <button
                         type="button"
                         className="ojo"
                         onClick={() => setShowPassword(!showConfirmPassword)}
                     >
                         <i
                             className={
                                 showConfirmPassword
                                 ? "bi bi-eye-slash"
                                 : "bi bi-eye"
                             }
                         />
                     </button>
                                          
                </div>

                <button className="btn-login" type="submit">Registrarse</button>

                
             </form>
              <div className="login-footer">

                <p>
                     ¿Ya  tienes una cuenta? <span
                className="link-button"
                onClick={onLogin}
            >
                Iniciar sesion
            </span>
                               </p>
                        </div>
                    </div>
    )
}

export default RegisterForm;