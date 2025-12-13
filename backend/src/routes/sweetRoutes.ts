import { Router } from "express";
import { createSweetController,getAllSweetsController,searchSweetsController,updateSweetController,deleteSweetController } from "../controllers/sweetController";
const router=Router();
router.post("/",createSweetController)
router.get("/",getAllSweetsController);
router.get("/search",searchSweetsController)
router.put("/:id",updateSweetController)
router.delete("/:id",deleteSweetController)
export default router;