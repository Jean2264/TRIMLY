import { Router } from "express";
import { login, activarCuenta } from "../controllers/auth.controller.js";

const router = Router();

router.get("/test", (req, res) => {
  res.send("Ruta auth funcionando");
});

router.post("/login", login);
router.post("/activar-cuenta", activarCuenta);

export default router;
