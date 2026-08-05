import {Router} from "express";
import {login} from "../controllers/auth.controller.js";

const router= Router();

router.get("/test", (req, res) => {
    res.send("Ruta auth funcionando");
});

router.post("/login", login);

export default router;