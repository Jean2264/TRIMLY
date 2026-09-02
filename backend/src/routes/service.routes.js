import { Router } from "express";
import { createServices } from "../controllers/service.controller.js";

const router = Router();

router.post("/", createServices);

export default router;
