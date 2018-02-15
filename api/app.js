global.ENV = process.env.NODE_ENV || 'development';
const bodyParser = require('body-parser');
const config = require('./config')
const cors = require('cors');
const express = require('express');
const path = require('path');
const winston = require('winston');
const errorUtils = require('./helpers/error-utils');

const app = express()

// middlewares
app.use(cors());

// static folder for public views
app.use(express.static(path.join(__dirname, '../public')));

// body partser initialize
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.error = function(params) {
    return res.status(params.statusCode).json({
      message: params.message
    })
  };

  next();
});

app.use('/', require('./routes/public'))

// error handlers
app.use(errorUtils.logErrors);
app.use(errorUtils.errorHandler);

const port = 3000;
app.listen(port, () => {
	winston.info(`Server started successfully`);
});
