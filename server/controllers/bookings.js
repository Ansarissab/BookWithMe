const Bookings = require('../models/bookings');
const Rental = require('../models/rental');
const { normalizeErrors } = require('../helper/mongooes');
const moment = require('moment');

exports.createBookings = function(req, res) {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
    const user = res.local.user;

    const bookings = new Bookings();
    Rental.findById(rental._id).populate('bookings').populate('user').exec(function(err, foundRental) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        // if user own the rental
        if (foundRental.user._id === user._id) {
            return res.status(422).send({ title: "Invalid User!", detail: "Cannot creat bookings on rental that you own" });
        }
        // check for valid booking is it available
        if (isValidBooking(booking, foundRental)) {
            booking.user = user;
            booking.rentals = foundRental;
            foundRental.bookings.push(booking);
            booking.save((err) => {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }
                foundRental.save();
                user.update({ _id: user._id }, { $push: { bookings: booking } });
                return res.json({ startAt: booking.startAt, endAt: booking.endAt }, (err) => {
                    if (err) {
                        return res.status(422).send({ errors: normalizeErrors(err.errors) });
                    }
                });
            });
        } else {
            return res.status(422).send({ title: "Invalid Booking!", detail: "Choosen date are already taken!" });
        }
    });

}

function isValidBooking(proposedBooking, rental) {
    const isValid = true;
    if (rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every(function(booking) {
            const proposedStart = moment(proposedBookin.startAt);
            const proposedEnd = moment(proposedBooking.endAt);
            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);

            return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart))
        });
    }
}