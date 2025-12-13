import { Router } from "express";
import { createSweetController,getAllSweetsController } from "../controllers/sweetController";
const router=Router();
router.post("/",createSweetController)
router.get("/",getAllSweetsController);
export default router;