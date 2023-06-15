import express from 'express';
const router=express.Router();
// ,customerHistory,
import { request,updateStatus ,addMechanic,id,customerHistory,shopHistory,updateCustomerId,updateShopCustomer} from '../controller/booking.controller.js';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/verification.js';
router.post("/request",request);
router.post("/updateStatus",updateStatus);
router.post("/addMechanic", verifyToken,addMechanic )
router.post("/customerHistory",customerHistory);
router.get("/shopHistory",verifyToken,shopHistory);
router.post("/id",id);
router.post("/updateCustomerId",updateCustomerId);
router.post("/updateShopCustomer",updateShopCustomer)
export default router;