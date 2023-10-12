const express = require('express');
const { addReview, getReviewsByProductID } = require('../controllers/review.controller');
const verifyToken = require('../middlewares/verify-token');
const upload = require('../middlewares/upload-photo');
const router = express.Router();

router.post('/reviews/:productID', [verifyToken, upload.single('photo')], addReview);
router.get('/reviews/:productID', getReviewsByProductID);

module.exports = router;