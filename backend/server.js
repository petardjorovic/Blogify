const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log("Couldn't connect to MongoDB", err);
    });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes'));

app.listen(process.env.PORT, (err) => {
    if (err) console.log('An error occurred while trying to start server', err);
    console.log('Listening to PORT', process.env.PORT);
});
