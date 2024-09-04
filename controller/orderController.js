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
    try {
        const { prodID } = req.body;
        
        // Ensure the user has permission to place the order
        if (req.user.userRole !== 'admin' && req.user.userID !== req.params.userID) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to place an order for this user' });
        }

        // Insert the order
        await createOrder(req.params.userID, prodID);

        res.status(201).json({ message: 'Order was inserted successfully' });
    } catch (error) {
        console.error('Error inserting order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
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
