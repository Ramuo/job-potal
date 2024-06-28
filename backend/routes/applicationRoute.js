import express from "express";
import {
    applyForJob ,
    getApplications,
    getMyApplications,
    deleteApplication,
} from "../controllers/applicationController.js";
import {protect, authorize} from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


const router = express.Router();

router.route('/').get(protect, authorize("Employer"), getApplications);
router.route('/getMyapplications').get(protect, authorize("Applicant"), getMyApplications);
// router.route('/apply').post(protect, applyForJob );
router.route('/apply').post(applyForJob);
router.route('/:id').delete(protect, authorize("Employer"), checkObjectId, deleteApplication);

export default router;