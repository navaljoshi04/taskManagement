import express from "express";
import { login, signup } from "../controllers/userController.js";
import { signupValidation } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", login);

export default router;
