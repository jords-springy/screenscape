import { getAllOrders, getOrderById, createOrder, updateOrder, deleteAllOrders, deleteOrderById } from '../model/orderDb.js';

const getOrders = async (req, res) => {
    if (req.user.userRole === 'admin') {
        return res.json(await getAllOrders(req.params.userID));
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have permission to view these orders' });
    }
};

const getOrder = async (req, res) => {
    if (req.user.userRole === 'admin') {
        return res.json(await getOrderById(req.params.userID, req.params.orderID));
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have permission to view this order' });
    }
};

const insertOrder = async (req, res) => {
    const { prodID } = req.body;
    await createOrder(req.params.userID, prodID);
    res.send('Order was inserted successfully');
};

const updateOrderDetails = async (req, res) => {
    const { prodID } = req.body;
    const existingOrder = await getOrderById(req.params.userID, req.params.orderID);
    const updatedProdID = prodID || existingOrder.prodID;
    await updateOrder(req.params.userID, req.params.orderID, updatedProdID);
    res.send('Order update was successful');
};

 const deleteAllUserOrders = async (req, res) => {
    await deleteAllOrders(req.params.userID);
    res.send('All orders have been deleted');
};

const deleteOrder = async (req, res) => {
    await deleteOrderById(req.params.userID, req.params.orderID);
    res.send('Order has been deleted');
};

export {getOrders,getOrder,insertOrder,updateOrderDetails,deleteAllUserOrders,deleteOrder}
