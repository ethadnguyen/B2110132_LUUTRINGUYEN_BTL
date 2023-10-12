const express = require('express');
const { login, signup, getUserProfile, updateUserProfile } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verify-token');

const router = express.Router();

router.post('/auth/login', login);
router.post('/auth/signup', signup);
router.get('/auth/user', verifyToken, getUserProfile);
router.put('/auth/user', verifyToken, updateUserProfile);

module.exports = router;