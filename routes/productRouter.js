import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct,addToCart} from '../controller/productController.js'
const router = express.Router()
import { verifyAToken } from '../middleware/authenticate.js'
import { authMiddleware , adminMiddleware } from '../middleware/authenticate.js';

router.use(authMiddleware);
router.post('/cart',verifyAToken,addToCart)
router.
    route('/')
        .get(getProducts)
        .post(adminMiddleware,insertProduct)
router.
    route('/:prodID')
        .get(getProduct)
        .delete(adminMiddleware,deleteProduct)
        .patch(adminMiddleware,updateProduct)
export default router