const errorHandler = (err, req, res, next) => {
	let error = {
		...err,
	}

	error.message = err.message

	if (err.type === 'entity.parse.failed') {
		error.message = 'Invalid JSON payload passed.'
	}
	res.status(error.statusCode || 500).json({
		error: error.messageWithField || error.message || 'Server Error',
		status: 'error',
		data: error.data || null,
	})
}

module.exports = errorHandler
