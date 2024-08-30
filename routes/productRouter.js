import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct,addToCart} from '../controller/productController.js'
const router = express.Router()
import { verifyAToken } from '../middleware/authenticate.js'
router.post('/cart',verifyAToken,addToCart)
router.
    route('/')
        .get(getProducts)
        .post(insertProduct)
router.
    route('/:prodID')
        .get(getProduct)
        .delete(deleteProduct)
        .patch(updateProduct)
export default router