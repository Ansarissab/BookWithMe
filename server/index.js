const express = require('express');
const config_db_uri = require('./config/dev');
const bodyParser = require('body-parser');

const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const mongoose = require('mongoose');

const rentalRoutes = require('./routes/rantals');
const usersRoutes = require('./routes/users');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(PORT, function() {
    // something
    console.log("Server is Running...!");
});

mongoose.connect(
    config_db_uri.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    }
).then(() => {
    const fakedb = new FakeDb();
    fakedb.seedDb();
}).catch((err) => {
    console.log("Error: " + err);
});