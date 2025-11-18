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
router.post("/create", authMiddleware, createTask);
router.patch("/:id/status", authMiddleware, changeStatusById);
router.patch("/:id", authMiddleware, updateTaskById);

export default router;
