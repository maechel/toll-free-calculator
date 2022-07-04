import path from 'path';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import hpp from 'hpp';
import chalk from 'chalk';

// ------------ *** Route Controllers *** -------------
import usersRoute from './api-routes/users.mjs';
import vehiclesRoute from './api-routes/vehicles.mjs';
import passagesRoute from './api-routes/passages.mjs';
import billingRoute from './api-routes/billing.mjs';
import randomRoute from './api-routes/random.mjs';
// ----------------------------------------------------

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'http://localhost';
const clientPath = path.resolve(process.cwd(), '..', '/client');

const app = express();

app.disable('x-powered-by');

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Setting up path to static content
app.use(express.static(`${clientPath}`));

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Enable CORS
app.use(cors());

// Prevent http param pollution
app.use(hpp());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), '..', 'client', 'build')));
}

// ------ *** Route handlers *** -------
app.use('/api/users', usersRoute);
app.use('/api/vehicles', vehiclesRoute);
app.use('/api/passages', passagesRoute);
app.use('/api/billing', billingRoute);
app.use('/api/random', randomRoute);
// -------------------------------------

app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'health OK' });
});

app.use((req, res) => {
    res.status(404).json({ success: false, msg: '404 Not Found' })
});

// custom error handler
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ success: false, msg: '500 Internal Server Error'});
});

const index = app.listen(PORT, () => {
    console.log(chalk.bold.greenBright(`Server running in ${chalk.bold.whiteBright(process.env.NODE_ENV)} mode on ${HOST}:${PORT}`));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    if (error && error.message) {
        console.log(chalk.red(
            `Error (UnhandledRejection):
                ${error.message}
            `
        ));
    } else if (error) {
        console.log(chalk.red(`An Unhandled Rejection occurred:
            ${error}
         `
        ));
    } else {
        console.log(chalk.red(`An Unhandled Rejection occurred`));
    }

    // close server and exit process
    index.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
    if (error && error.message) {
        console.log(chalk.red(
            `Error (UncaughtException):
                ${error.message}
            `
        ));
    } else if (error) {
        console.log(chalk.red(`An UncaughtException occurred:
            ${error}
         `
        ));
    } else {
        console.log(chalk.red(`An UncaughtException occurred`));
    }

    // close server and exit process
    index.close(() => process.exit(1));
});