import express from 'express';
import { removeCategory, saveCategory , categoryList} from '../controller/category.controller.js';
import { verifyToken } from '../middleware/verification.js';

const router=express.Router();
router.post('/saveCategory',verifyToken,saveCategory);
router.post('/removeCategory',verifyToken,removeCategory);
router.get("/categoryList",categoryList);

export default router;