import { Router } from "express";
import {
  createServices,
  getServicesController,
} from "../controllers/service.controller.js";

const router = Router();

router.post("/", createServices);
router.get("/", getServicesController);
export default router;
