import express from "express";
import { loginController, signupController, logoutController, getMeController } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

router.post("/logout", logoutController);
router.get("/me", protect ,getMeController);

export default router;