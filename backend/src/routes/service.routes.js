import { Router } from "express";
import {
  createServices,
  getServicesController,
  seeService,
} from "../controllers/service.controller.js";

const router = Router();

router.post("/", createServices);
router.get("/", getServicesController);
router.get("/:id", seeService);
export default router;
