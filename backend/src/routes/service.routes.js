import { Router } from "express";
import {
  createServices,
  getServicesController,
  seeService,
  updateService,
  deleteServiceState,
} from "../controllers/service.controller.js";

const router = Router();

router.post("/", createServices);
router.get("/", getServicesController);
router.get("/:id", seeService);
router.put("/:id", updateService);
router.delete("/:id", deleteServiceState);
export default router;
