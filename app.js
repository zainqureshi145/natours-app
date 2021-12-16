const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

// Custom Middlewares
app.use((request, response, next) => {
    console.log('Custom Middleware...');
    next();
});

//This is a middleware to add a timestamp in our requests
app.use((request, response, next) => {
    request.requestTime = new Date().toUTCString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;