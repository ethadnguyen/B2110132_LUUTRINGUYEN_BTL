const express = require('express');
const { createCategory, getCategories } = require('../controllers/category.controller');
const router = express.Router();

router.post('/categories', createCategory);

router.get('/categories', getCategories);

module.exports = router;