const express = require('express');
const upload = require('../middlewares/upload-photo');
const { createOwner, getOwners, deleteOwner } = require('../controllers/owner.controller');
const router = express.Router();

router.post('/owners', upload.single("photo"), createOwner);

router.get('/owners', getOwners);

router.delete('/owners/:id', deleteOwner);

module.exports = router;