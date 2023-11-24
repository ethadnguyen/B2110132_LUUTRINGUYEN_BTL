const express = require('express');
const verifyToken = require('../middlewares/verify-token');
const {
    getAddresses,
    getCountries,
    getSingleAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
}
    = require('../controllers/address.controller');
const router = express.Router();

router.get('/addresses', verifyToken, getAddresses);
router.get('/countries', getCountries);
router.get('/addresses/:id', verifyToken, getSingleAddress);
router.post('/addresses', verifyToken, createAddress);
router.put('/addresses/:id', verifyToken, updateAddress);
router.delete('/addresses/:id', verifyToken, deleteAddress);
router.put('/addresses/set/default', verifyToken, setDefaultAddress);

module.exports = router;