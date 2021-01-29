const express = require('express')
const colors = require('colors')
// const morgan = require('morgan')
const cors = require('cors')

const errorHandler = require('./middleware/error')

const validationRoutes = require('./routes/validations')

const app = express()

app.use(express.json())

// if (process.env.NODE_ENV === 'development') {
// 	app.use(morgan('dev'))
// }

// Enable CORS
app.use(cors())

app.use(validationRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
	console.log(`We are live on port ${PORT}`.yellow.bold)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red)
	// Close server & exit process
	server.close(() => process.exit(1))
})
