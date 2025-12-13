import { Router } from "express";
import { createSweetController } from "../controllers/sweetController";
const router=Router();
router.post("/",createSweetController)
export default router;