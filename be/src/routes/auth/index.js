import { Router } from "express";
import { registerController, loginController, logoutController } from "../../controllers/authenticate.controller.js";
import verifyToken from "../../middleware/verify_token.middleware.js";

const router = Router();

// Register route
router.post("/register", registerController);
// Login route
router.post("/login", loginController);
// Logout route
router.post("/logout", logoutController);

export default router;