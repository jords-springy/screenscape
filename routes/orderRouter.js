import express from 'express';
import { authMiddleware } from '../middleware/authenticate.js';
import { adminMiddleware } from '../middleware/authenticate.js';
import { getOrders, getOrder, insertOrder, updateOrderDetails, deleteAllUserOrders, deleteOrder } from '../controller/orderController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/user/:userID/order', getOrders);

router.get('/user/:userID/order/:orderID', getOrder);

router.post('/user/:userID/order', adminMiddleware, insertOrder);

router.patch('/user/:userID/order/:orderID', adminMiddleware, updateOrderDetails);

router.delete('/user/:userID/order', adminMiddleware, deleteAllUserOrders);

router.delete('/user/:userID/order/:orderID', adminMiddleware, deleteOrder);
export default router;
