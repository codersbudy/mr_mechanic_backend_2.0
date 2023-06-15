import express  from "express";


// import { bulkSaveRating, ratinglist,ratingsave ,getMechanicRating} from "../controller/mechanicRating.controller.js";
import { verifyToken } from "../middleware/verification.js";

const router = express.Router();

// router.post("ratingsave",verifyToken,ratingsave);
// router.post("ratinglist",verifyToken,ratinglist);
// router.post("/bulkSaveRating",bulkSaveRating)
// router.post("/getMechanicRating",getMechanicRating)
export default router;
