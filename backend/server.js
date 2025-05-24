// IMPORT PACKAGE
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { rateLimit } = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');

const logger = require('./utils/logger');
const CustomError = require('./utils/CustomError');
const errorController = require('./controllers/errorController');
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

app.use(helmet());

app.use(
    morgan('combined', {
        skip: (req) => req.path.startsWith('/uploads') || req.path === '/favicon.ico',
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

// ovo je obavezno kad koristis servise kao sto je render (jer su reverse proxy)
// da bi mogla da se prepozna IP adresa posetioca
app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: 'Too many requests from this IP address. Try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minuta
    max: 5, // samo 5 pokušaja po IP
    message: 'Too many login attemps. Try again after 10 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});

app.use('/api/auth/login', loginLimiter);

app.use('/api', limiter);

app.use(
    express.json({
        limit: '50kb', // test je 5mb
        verify: (req, res, buf) => {
            // buf je Buffer koji sadrži sirovi body requesta
            req.rawBodySize = buf.length; // velicina u bajtovima
        },
    })
);

// Middleware za logovanje veličine requesta JSON payloada
// app.use((req, res, next) => {
//     if (req.rawBodySize !== undefined) {
//         console.log(`Velicina JSON tela je: ${req.rawBodySize} bajtova`);
//     }
//     next();
// });

app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [
    'http://localhost:5173', // frontend lokalno
    'https://mysocialnet.onrender.com', // produkcija
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Dozvoli zahteve sa servera (bez origin headera) i sa dozvoljenih domena
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        // Ne stavljaj credentials: true ako ne koristiš cookie
    })
);

app.use('/', require('./routes'));

app.use((req, res, next) => {
    return next(new CustomError(`${req.originalUrl} Page not Found`, 404));
});

app.use(errorController);

app.listen(process.env.PORT, (err) => {
    if (err) console.log('An error occurred while trying to start server', err);
    console.log('Listening to PORT', process.env.PORT);
});
