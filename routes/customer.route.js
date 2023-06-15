import express from 'express';
import { body } from 'express-validator';
// import { verify } from 'jsonwebtoken';
import multer from 'multer'
import { signUp,signIn, updataProfile,registrationVerifyOtp,bulkSave,id,forgotPassword,setPassword,bcryptPassword, verifyOtp} from '../controller/customer.controller.js';

import { verifyToken } from '../middleware/verification.js';

const router = express.Router();
const upload = multer({ dest: "public/images" });
router.post("/signUp", body("customerName").notEmpty(),
    body("contact", "please enter contact").notEmpty(),
    body("password", "please enter password").notEmpty(),
    body("password", "password must have minimum 8 later and maximum 16 later").isLength({
        min: 8,
        max: 16
    }),
    signUp);
router.post("/signIn", signIn);
router.post("/updataProfile", upload.single("photo"), updataProfile);
// router.post("/updateProfile",upload.array("image",1),updataProfile);
router.post("/id", verifyToken, id);
router.post("/forgotPassword", forgotPassword)

router.post("/tempraryPassword",verifyOtp)
router.post("/setPassword",setPassword);
router.post("/verifyOtp",body("customerName").notEmpty(),
body("contact","please enter contact").notEmpty(),
body("password", "please enter password").notEmpty(),
body("password", "password must have minimum 8 later and maximum 16 later").isLength({
    min: 8,
    max: 16
}),registrationVerifyOtp);

router.post("/bcryptPassword",bcryptPassword)
router.post("/bulksave",bulkSave)
export default router;