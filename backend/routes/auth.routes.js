import express from "express";
import { generateOtpAndRegisterMobile, logout, signup, verifyOtpAndVerifyUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/generate-otp", generateOtpAndRegisterMobile);
router.post("/verify-otp", verifyOtpAndVerifyUser);
router.post("/signup", signup);
// router.post("/login", login);
router.post("/logout", logout);

export default router;
