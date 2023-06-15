import express from 'express';
import { save, remove, getList, id, updateShop, updateStatus,nearByShop ,bulkSave, signIn} from '../controller/shop.controller.js';
import { verifyToken } from '../middleware/verification.js';
import { body } from 'express-validator';
const router=express.Router();

router.post("/save",
body("shopName","please enter shopName").notEmpty(),
body("photo").notEmpty(),
body("address").notEmpty(),
body("latLong").notEmpty(),
body("password").isLength({min:8,max:16}),
save);
router.post("/signIn",signIn);
router.post("/remove",remove);
router.get("/getList",getList);
router.post("/id",id);
router.post("/update",updateShop);
router.post("/updateStatus",updateStatus)
router.post("/nearByShop",nearByShop);
router.post("/bulkSave",bulkSave);
export default router;