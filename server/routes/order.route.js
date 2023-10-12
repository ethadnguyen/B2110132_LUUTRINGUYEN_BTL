const express = require('express');
const { getOrders } = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verify-token');
const router = express.Router();

router.get('/orders', verifyToken, getOrders);

module.exports = router;