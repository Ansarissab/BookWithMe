const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/rental');

router.get('', RentalController.Find);
router.get('/:id', RentalController.FindById);

module.exports = router;