import express from "express";
import {
    getJobs,
    createJob,
    getMyJobs,
    updateJob,
    deleteJob,
    getSingleJob,
} from "../controllers/jobController.js";
import {protect, authorize} from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";







const router = express.Router();


router.route('/').get(getJobs);
router.route('/create').post(protect, authorize("Employer"), createJob);
router.route('/getmyjobs').get(protect, authorize("Employer"), getMyJobs);//jobs Posted by me
router.route('/:id')
    .put(protect, authorize("Employer"), checkObjectId, updateJob)
    .delete(protect, authorize("Employer"), checkObjectId, deleteJob)
    .get(protect, checkObjectId, getSingleJob)


export default router