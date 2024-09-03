import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser} from '../controller/userController.js'
import { authMiddleware,adminMiddleware } from '../middleware/authenticate.js';
import { registerUser } from '../controller/userController.js'
const router = express.Router()

router.post('/register', registerUser);
router.post('/login',authMiddleware,loginUser)
router.
    route('/')
        .get(getUsers)
        .post(insertUser)

router.
    route('/:userID')
        .get(getUser)
        .delete(deleteUser)
        .patch(updateUser)
export default router