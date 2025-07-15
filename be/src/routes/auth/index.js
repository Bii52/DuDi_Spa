import { Router } from "express";
import { registerController, loginController, logoutController } from "../../controllers/authenticate.controller.js";
import verifyToken from "../../middleware/verify_token.middleware.js";

const router = Router();

router.post("/test-verify-token", verifyToken, (req, res) => {
  console.log(req.userData)
  return res.status(200).json({
    "error": 0,
    "error_text": "",
    "data_name": "Xác thực thành công",
    "data": {
      "user": req.userData.user
    }
  });
});

// Register route
router.post("/register", registerController);
// Login route
router.post("/login", loginController);
// Logout route
router.post("/logout", logoutController);

export default router;