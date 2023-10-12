const express = require('express');
const { calculateShipment, makePayment } = require('../controllers/payment.controller');
const verifyToken = require('../middlewares/verify-token');
const router = express.Router();


router.post('/shipment', calculateShipment);
router.post('/payment', verifyToken, makePayment);

module.exports = router;