import { pool } from '../config/config.js';

const getAllOrders = async () => {
    let [orders] = await pool.query('SELECT * FROM bfgktuen9wud2azxdgho.orders');
    return orders;
};

const getOrderById = async (userID, orderID) => {
    let [[order]] = await pool.query('SELECT * FROM bfgktuen9wud2azxdgho.orders WHERE userID = ? AND orderID = ?', [userID, orderID]);
    return order;
};

const createOrder = async (userID, prodID) => {
    await pool.query(`
        INSERT INTO bfgktuen9wud2azxdgho.orders (userID, prodID)
        VALUES (?, ?)
    `, [userID, prodID]);
};

const updateOrder = async (userID, orderID, prodID) => {
    await pool.query(`
        UPDATE bfgktuen9wud2azxdgho.orders
        SET prodID = ?
        WHERE userID = ? AND orderID = ?
    `, [prodID, userID, orderID]);
};

const deleteAllOrders = async (userID) => {
    await pool.query('DELETE FROM bfgktuen9wud2azxdgho.orders WHERE userID = ?', [userID]);
};

const deleteOrderById = async (userID, orderID) => {
    await pool.query('DELETE FROM bfgktuen9wud2azxdgho.orders WHERE userID = ? AND orderID = ?', [userID, orderID]);
};

export { getAllOrders, getOrderById, createOrder, updateOrder, deleteAllOrders, deleteOrderById };
