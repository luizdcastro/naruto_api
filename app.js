const express = require('express');
const morgan = require('morgan');

const shinobiRouter = require('./routes/shinobiRoutes');

const app = express();

// Midlewares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/shinobis', shinobiRouter);

module.exports = app;
