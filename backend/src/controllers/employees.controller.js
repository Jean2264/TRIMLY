import { createEmployee } from "../services/employees.service.js";

async function createEmployees(req,res){
   
    try{
        const result= await createEmployee(req.body);
        if(!result.ok){
            return res.status(400).json({
                message: "Datos invalidos",
                errors: result.errors
            });
        }

        res.status(200).json({
            message: "Empleado creado correctamente",
            employee: result.employee
        });
    }catch(error){
        console.error(error);


        res.status(500).json({
            message: "Error al crear empleado"
        })
    }
}

export{
    createEmployees
};