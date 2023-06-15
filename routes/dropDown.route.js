import express from 'express';
import { searchCity,searchPincode} from '../controller/dropDown.controller.js';
const router=express.Router();
router.post("/searchCity",searchCity);
router.post("/searchPincode",searchPincode);
export default router;