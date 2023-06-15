import express from "express";

import { signIn, forgotPassword,appPerformance, setPassword, verifyOtp } from "../controller/admin.controller.js";

import { verifyToken } from "../middleware/verification.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/forgotPassword", forgotPassword);
router.get("/applictionPerformance", appPerformance);
router.post("/setPassword", setPassword)
router.post("/verifyOtp", verifyOtp)

export default router;


