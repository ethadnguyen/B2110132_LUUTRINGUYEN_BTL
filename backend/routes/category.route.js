const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/category.controller');
const router = express.Router();

router.post('/categories', createCategory);

router.get('/categories', getCategories);

router.delete('/categories/:id', deleteCategory);

module.exports = router;