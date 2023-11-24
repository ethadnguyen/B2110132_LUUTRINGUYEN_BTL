const express = require('express');
const upload = require('../middlewares/upload-photo');
const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const router = express.Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getSingleProduct);

router.post('/products', upload.single('photo'), createProduct);

router.put('/products/:id', upload.single('photo'), updateProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router;