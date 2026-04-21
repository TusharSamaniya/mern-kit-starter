import winston, { format } from 'winston';
const {  timestamp, combine, prettyPrint } = format
const myCustomLevels = {
    levels: {
        error: 0,
        auth: 1,
        info: 2,
        http: 3,
    }
};

// Create a Winston logger
const customLevelLogger = winston.createLogger({
    levels: myCustomLevels.levels,
    format: combine(
        timestamp({ format: 'DD-MM-YY HH:mm:ss:ms' }),
        format.json(),
        prettyPrint()
    ),
    transports: [
        // Log errors to a file
        new winston.transports.File({ filename: 'logger/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logger/auth.log', level: 'auth' }),
        new winston.transports.File({ filename: 'logger/info.log', level: 'info' }),
        // Log all levels to a file
        new winston.transports.File({ filename: 'logger/combined.log' }),
    ],
});



export default customLevelLogger;
