import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser,loginUser} from '../controller/userController.js'
import {checkAdmin, checkUser} from '../middleware/authenticate.js'
import { registerUser } from '../controller/userController.js'
const router = express.Router()

router.post('/register',checkAdmin, registerUser);
router.post('/login',checkUser,loginUser)
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