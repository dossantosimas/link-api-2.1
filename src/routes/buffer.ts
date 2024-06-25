import { Router } from "express";
import { saveProcess, saveNoti, GetAllEventos } from "../controllers/buffer.controller";

const router = Router()

router
  .post('/process',saveProcess)
  .post('/notificacion', saveNoti)
  .get('/eventos', GetAllEventos)


export default router
