import { Router } from "express";
import {
  createSweetController,
  getAllSweetsController,
  searchSweetsController,
  updateSweetController,
  deleteSweetController,
  purchaseSweetController,
  restockSweetController,
} from "../controllers/sweetController";

import { authMiddleware } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminOnly";
const router = Router();
router.get("/", authMiddleware, getAllSweetsController);
router.get("/search", authMiddleware, searchSweetsController);
router.post("/:id/purchase", authMiddleware, purchaseSweetController);
//admin 
router.post("/", authMiddleware, adminOnly, createSweetController);
router.put("/:id", authMiddleware, adminOnly, updateSweetController);
router.delete("/:id", authMiddleware, adminOnly, deleteSweetController);
router.post("/:id/restock", authMiddleware, adminOnly, restockSweetController);
export default router;