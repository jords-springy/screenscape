import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser} from '../controller/userController.js'
import { registerUser } from '../controller/userController.js'
import { authMiddleware } from '../middleware/authenticate.js'
const router = express.Router()

router.post('/register', registerUser);
router.post('/login',loginUser)
router.
    route('/')
        .get(getUsers)
        .post(insertUser)

router.
    route('/:userID')
        .get(authMiddleware,getUser)
        .delete(deleteUser)
        .patch(updateUser)



export default router