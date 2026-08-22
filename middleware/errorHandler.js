const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: `Invalid ${err.path}: ${err.value}`
    });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      status: 'fail',
      message: messages.join(', ')
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      status: 'fail',
      message: 'Duplicate field value entered'
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }


  console.error('ERROR :', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};

module.exports = errorHandler;