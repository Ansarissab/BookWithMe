const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rentalSchema = new Schema({
    title: { type: String, required: true, max: [128, "Too long title, max is 128 characters"] },
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'Too short, min is 4 characters'] },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    bedrooms: { type: Number },
    shared: { type: Boolean },
    description: { type: String, required: true },
    dailyRate: { type: Number },
    createdOn: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Rental', rentalSchema);