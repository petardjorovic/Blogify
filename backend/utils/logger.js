const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

const transportError = new winston.transports.DailyRotateFile({
    filename: 'error-%DATE%.log',
    dirname: logDir,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',
});

const transportCombined = new winston.transports.DailyRotateFile({
    filename: 'combined-%DATE%.log',
    dirname: logDir,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [transportError, transportCombined],
});

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple(),
//         })
//     );
// }

module.exports = logger;
