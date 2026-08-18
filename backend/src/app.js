//Importo express para poder usarlo en el back
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import EmployeesRoutes from "./routes/employees.routes.js";

//Usamos el express que importamos
const app = express();
app.use(cors());
//"Aplicación, usá el middleware que convierte automáticamente los JSON recibidos en objetos JavaScript.
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/employees", EmployeesRoutes)

app.get("/", (req, res)=>{
   res.send("Servidor iniciado wii"); 
}) 

export default app;