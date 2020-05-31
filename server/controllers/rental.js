const Rental = require('../models/rental');

exports.Find = function(req, res) {
    Rental.find({}, (err, foundRentals) => {
        res.json(foundRentals);
    });
}

exports.FindById = function(req, res) {
    const rentalId = req.params.id;
    Rental.findById(rentalId, (err, foundRentals) => {
        if (err) {
            res.status(422).send({
                errors: [{ error: 'Rental error..!', detail: 'Could not found rental...!' }]
            });
        }
        res.json(foundRentals);
    });
}