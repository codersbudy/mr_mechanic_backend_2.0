import express from 'express';


import {save,id,remove,updateStatus} from '../controller/mechanic.controller.js'
import { verifyToken } from '../middleware/verification.js';
import { body } from 'express-validator';


const router = express.Router();

router.post("/save",
body("mechanicName").notEmpty(),
body("contact").notEmpty()
,save);
router.get("/id/:mechanicId",id);
router.get("/remove/:mechanicId",remove);
router.post("/updateStatus",updateStatus);
export default router;