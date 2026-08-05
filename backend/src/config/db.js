import "dotenv/config"
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

pool.connect()
.then(()=>{
    console.log("Conectado a la base de datos");
})
.catch((error)=>{
    console.error("Error al conectar a la base de datos:", error);
})

export default pool;