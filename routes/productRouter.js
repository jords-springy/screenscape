import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct,addToOrder} from '../controller/productController.js'
const router = express.Router()
import { verifyAToken } from '../middleware/authenticate.js'
import { authMiddleware , adminMiddleware } from '../middleware/authenticate.js';

router.use(authMiddleware);
router.post('/cart',verifyAToken,addToOrder)
router.
    route('/')
        .get(adminMiddleware,getProducts)
        .post(adminMiddleware,insertProduct)
router.
    route('/:prodID')
        .get(adminMiddleware,getProduct)
        .delete(adminMiddleware,deleteProduct)
        .put(adminMiddleware,updateProduct)
export default router