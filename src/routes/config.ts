import { Router } from "express";
import { InstallComponents } from "../controllers/config.controller";

const router = Router()

router.post('/install/auto', InstallComponents)

export default router;