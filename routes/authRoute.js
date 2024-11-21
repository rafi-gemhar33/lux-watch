import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middleswares/authMiddleware.js";
import { isAdmin } from "../middleswares/authMiddleware.js";

const router = express.Router();

//Register - POST
router.post("/register", registerController);
//Login - POST
router.post("/login", loginController);
//Password Forgot
router.post("/forgot-password", forgotPasswordController);
//testing routes
router.get("/test", requireSignIn, isAdmin, testController);
//Protected route Auth
router.get("/user-Auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
