import express from "express";
import {
  changeStatusById,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/create", authMiddleware, createTask);
router.patch("/:id/status", authMiddleware, changeStatusById);
router.patch("/:id", authMiddleware, updateTaskById);
router.delete("/delete/:id", authMiddleware, deleteTask);

export default router;
