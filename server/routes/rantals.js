const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');


router.get('', function(req, res) {
    Rental.find({}, (err, foundRentals) => {
        res.json(foundRentals);
    });
});
router.get('/:id', function(req, res) {
    const rentalId = req.params.id;
    Rental.findById(rentalId, (err, foundRentals) => {
        if (err) {
            res.status(422).send({
                errors: [{ error: 'Rental error..!', detail: 'Could not found rental...!' }]
            });
        }
        res.json(foundRentals);
    });
});

module.exports = router;