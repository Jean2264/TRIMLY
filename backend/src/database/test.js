import pool from "../config/db.js";


const result= await pool.query(
    "select now()"
);

console.log(result.rows);