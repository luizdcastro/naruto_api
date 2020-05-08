const express = require('express');
const morgan = require('morgan');

const AppError = require('/utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const shinobiRouter = require('./routes/shinobiRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/shinobis', shinobiRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
