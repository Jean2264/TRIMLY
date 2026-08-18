//siempre importamos
import { Router } from "express";
import { createEmployees } from "../controllers/employees.controller.js";
const router= Router();

router.post("/", createEmployees);

export default router;