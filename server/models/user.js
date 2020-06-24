const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        max: [32, "Too long, max is 32 characters"],
        min: [5, "Too short, minimum is 5 characters"]
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: 'Password is required',
        min: [4, 'Too short, min is 4 characters']
    },
    rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }],
    bookings: { type: Schema.Types.ObjectId, ref: 'Bookings' }
});

userSchema.methods.hasSamePassword = function(requestedpassword) {
    return bcrypt.compareSync(requestedpassword, this.password);
}

userSchema.pre('save', function(next) {
    const user = this;
    const saltRound = 15;
    bcrypt.genSalt(saltRound, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('User', userSchema);