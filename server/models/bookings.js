const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookingsSchema = new Schema({
    endAt: {
        type: Date,
        required: 'Ending date is required!'
    },
    startAt: {
        type: Date,
        required: 'Start date is required!'
    },
    totalPrice: {
        type: Number
    },
    days: {
        type: Number
    },
    guests: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }],
});

module.exports = mongoose.model('Bookings', bookingsSchema);