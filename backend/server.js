import app from "./src/app.js";
import "./src/config/db.js";

//Mi servidor queda esperando peticiones HTTP en el puerto 3000.
app.listen(3000,"0.0.2.0", ()=>{
    console.log("Servidor iniciado");
});


//EJEMPLOS DE ENDPOINT//
/**http://localhost:3000/login

http://localhost:3000/register

http://localhost:3000/services

http://localhost:3000/employees

http://localhost:3000/appointments */