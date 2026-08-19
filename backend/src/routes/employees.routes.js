//siempre importamos
import { Router } from "express";
import { createEmployees, getEmployees } from "../controllers/employees.controller.js";
const router= Router();

router.post("/", createEmployees);
router.get("/",getEmployees);
export default router;