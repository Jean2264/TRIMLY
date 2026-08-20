//siempre importamos
import { Router } from "express";
import { createEmployees, getEmployees, seeEmployee,updateEmployee,deleteEmployee } from "../controllers/employees.controller.js";
const router= Router();

router.post("/", createEmployees);
router.get("/",getEmployees);

router.get("/:id", seeEmployee) //<-- defino la variable en la URL
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
export default router;