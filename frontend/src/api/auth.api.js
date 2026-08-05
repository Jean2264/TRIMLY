//Es el responsable de hacer las peticiones al backend para el login y registro de usuarios y mas
/**React

↓

auth.api.js

↓

Express */
//Todo lo relacionado con HTTP (fetch, POST, GET, PUT, DELETE) va a vivir acá.

export async function  login(email, password){

    //fetch() es la funcion medianto nos podemos comunicar con el backend, es decir, hacer peticiones HTTP.
    const respuesta= await fetch("http://localhost:3000/auth/login",{
        method: "POST",
        //content-type es el tipo de contenido que le estamos enviando al backend, en este caso le estamos enviando un JSON.
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    const result= await respuesta.json();

    return result;
}