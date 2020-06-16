const User = require('../models/user');
const MongooesHelper = require('../helper/mongooes');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({
            errors: {
                title: "Missing data...!",
                detail: "Provide Email, Password and Confirmation Password."
            }
        });
    }
    User.findOne({ email }, function(err, user) {
        if (err) {
            return res.status(422).send({ errors: MongooesHelper.normalizeErrors(err.errors) });
        }
        if (!user) {
            return res.status(422).send({
                errors: {
                    title: "Invalid User.",
                    detail: "User with this email does not exist."
                }
            });
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user._id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h' });
            return res.json(token);

        } else {
            return res.status(422).send({
                errors: {
                    title: "Wrong Data.",
                    detail: "Incorrect Password."
                }
            });
        }
    });

}

exports.register = function(req, res) {
    const { username, email, password, passwordConfirmation } = req.body;

    if (!email || !password || !passwordConfirmation) {
        return res.status(422).send({
            errors: {
                title: "Missing data...!",
                detail: "Provide Email, Password and Confirmation Password."
            }
        });
    }
    if (password !== passwordConfirmation) {
        return res.status(422).send({
            errors: {
                title: "Invalid Password...!",
                detail: "Password is not same as confirmation password."
            }
        });
    }
    User.findOne({ email }, function(err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: MongooesHelper.normalizeErrors(err.errors) });
        }
        if (existingUser) {
            return res.status(422).send({ Error: "User with same email already exists." });
        }

        const user = new User({ username, email, password });
        user.save(function(err) {
            if (err) {
                return res.status(422).send({ errors: MongooesHelper.normalizeErrors(err.errors) });
            }
            return res.json({ registered: true });
        });
    });
}

exports.authMiddleware = function(req, res, next) {
    const token = req.header.authorization;
    if (token) {
        const user = parseToken(token);
        user.findById(user.userId, function(err, _user) {
            if (err) {
                return res.status(422).send({ errors: MongooesHelper.normalizeErrors(err.errors) });
            }
            if (user) {
                res.local.user = _user;
                next();
            } else {
                return res.status(401).send({
                    errors: {
                        title: "Not Authorized",
                        detail: "You need to login again to get access."
                    }
                });
            }
        });
    } else {
        return res.status(422).send({
            errors: {
                title: "Not Authorized",
                detail: "You need to login again to get access."
            }
        });
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}