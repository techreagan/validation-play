const express = require('express')
const { getDevDetails, validateRule } = require('../controllers/validations')

const router = express.Router()

router.route('/').get(getDevDetails)

router.route('/validate-rule').post(validateRule)

module.exports = router
