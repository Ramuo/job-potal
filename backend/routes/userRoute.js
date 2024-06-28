import express from 'express';
import {
    register,
    login,
    logout,
    getUsers,
    getUserById
} from '../controllers/userController.js';
import {protect, authorize} from '../middleware/authMiddleware.js';
import checkObjectId from "../middleware/checkObjectId.js"

const router = express.Router();


router.route('/').get(protect, getUsers)
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);
router.route('/:id')
  .get(protect, checkObjectId, getUserById)



export default router;