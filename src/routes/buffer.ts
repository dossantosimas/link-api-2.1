import { Router } from "express";
import { saveProcess, saveNoti } from "../controllers/buffer.controller";
// import { saveProcess, saveNoti } from "../../controllers/evento.controller";

const router = Router()

router
  .post('/process',saveProcess)
  .post('/notificacion', saveNoti)


export default router
