const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const error = {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred'
    };

    if (err.name === 'ValidationError') {
        error.code = 'VALIDATION_ERROR';
        error.message = err.message;
        return res.status(400).json(error);
    }

    if (err.name === 'CastError') {
        error.code = 'INVALID_ID';
        error.message = 'Invalid ID format';
        return res.status(400).json(error);
    }

    res.status(500).json(error);
};

module.exports = errorHandler;
