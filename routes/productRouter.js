import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct,addToOrder,fetchProducts} from '../controller/productController.js'
const router = express.Router()
import { verifyAToken } from '../middleware/authenticate.js'
import { authMiddleware , adminMiddleware } from '../middleware/authenticate.js';


router.post('/cart',verifyAToken,addToOrder)
router.
    route('/')
        .get(fetchProducts)
        .get(authMiddleware,adminMiddleware,getProducts)
        .post(authMiddleware,adminMiddleware,insertProduct)
router.
    route('/:prodID')
        .get(authMiddleware,adminMiddleware,getProduct)
        .delete(authMiddleware,adminMiddleware,deleteProduct)
        .put(authMiddleware,adminMiddleware,updateProduct)
export default router