const express = require('express')
const { getDevDetails } = require('../controllers/validations')

const router = express.Router()

router.route('/').get(getDevDetails)

module.exports = router
