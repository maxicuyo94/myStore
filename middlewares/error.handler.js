/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
function logErrors(err, req, res, next) {
  // console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  //importante poner los 4
  // console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
function boomErrorHandler(err, req, res, next) {
  //importante poner los 4
  // console.log('errorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
