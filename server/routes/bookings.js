const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const BookingsController = require('../controllers/bookings');

router.post('api/v1/bookings', UserController.authMiddleware, BookingsController.createBookings);

module.exports = router;