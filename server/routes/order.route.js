const express = require('express');
const { getOrders, deleteOrder } = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verify-token');
const router = express.Router();

router.get('/orders', verifyToken, getOrders);

router.delete('/orders/:id', verifyToken, deleteOrder);

module.exports = router;