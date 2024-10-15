import { getAllOrders, getOrderById, createOrder, updateOrder, deleteAllOrders, deleteOrderById } from '../model/orderDb.js';

const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders(req.params.userID);
    res.status(200).json(orders); 
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); 
  }
}

const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.userID, req.params.orderID);
    if (order) {
      res.status(200).json(order); 
    } else {
      res.status(404).json({ message: 'Order not found' }); 
    }
  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); 
  }
}

const insertOrder = async (req, res) => {
  try {
    const { prodID } = req.body;
    if (req.user.userID !== req.params.userID) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to place an order for this user' }); 
    }
    await createOrder(req.params.userID, prodID);
    res.status(201).json({ message: 'Order was inserted successfully' }); 
  } catch (error) {
    console.error('Error inserting order:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); 
  }
}

const updateOrderDetails = async (req, res) => {
  try {
    const existingOrder = await getOrderById(req.params.userID, req.params.orderID);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const { prodID } = req.body;
    const updatedProdID = prodID || existingOrder.prodID;
    await updateOrder(req.params.userID, req.params.orderID, updatedProdID);
    res.status(200).json({ message: 'Order update was successful' });
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteAllUserOrders = async (req, res) => {
  try {
    await deleteAllOrders(req.params.userID);
    res.status(200).json({ message: 'All orders have been deleted' }); 
  } catch (error) {
    console.error('Error deleting all user orders:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

const deleteOrder = async (req, res) => {
  try {
    await deleteOrderById(req.params.userID, req.params.orderID);
    res.status(200).json({ message: 'Order has been deleted' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message }); 
  }
}

export { getOrders, getOrder, insertOrder, updateOrderDetails, deleteAllUserOrders, deleteOrder };
