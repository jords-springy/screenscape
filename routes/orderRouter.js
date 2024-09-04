import express from 'express';
import { authMiddleware } from '../middleware/authenticate.js';
import { adminMiddleware } from '../middleware/authenticate.js';
import { getOrders, getOrder, insertOrder, updateOrderDetails, deleteAllUserOrders, deleteOrder } from '../controller/orderController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:userID/order', getOrders);

router.get('/:userID/order/:orderID', getOrder);

router.post('/:userID/order', adminMiddleware, insertOrder);

router.patch('/:userID/order/:orderID', adminMiddleware, updateOrderDetails);

router.delete('/:userID/order',  deleteAllUserOrders);

router.delete('/:userID/order/:orderID',  deleteOrder);
export default router;
