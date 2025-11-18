import express from "express";
import {
  changeStatusById,
  createTask,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/", authMiddleware, createTask);
router.put("/:id/status", authMiddleware, changeStatusById);
router.patch("/:id", authMiddleware, updateTaskById);

export default router;
