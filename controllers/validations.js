const ErrorResponse = require('../utils/errorResponse')
const {
	isRequired,
	isObject,
	isArray,
	isString,
	isEmptyObject,
	isValidCondition,
	validateCondition,
	validationMessage,
} = require('../utils/validationHelpers')

// @desc    Get dev details
// @route   GET /
// @access  Public
exports.getDevDetails = (req, res) => {
	res.status(200).json({
		message: 'My Rule-Validation API',
		status: 'success',
		data: {
			name: 'Ekhameye Reagan',
			github: '@techreagan',
			email: 'techreagan2@gmail.com',
			mobile: '08167710388',
			twitter: '@techreagan',
		},
	})
}

// @desc    Validate rule
// @route   POST /validate-rule
// @access  Public
exports.validateRule = (req, res, next) => {
	let { rule, data } = req.body
	const requiredFields = [
		'rule',
		'data',
		'field',
		'condition',
		'condition_value',
	]

	if (!isObject(rule) && !isRequired(rule)) {
		return next(new ErrorResponse(`rule should be an object.`, 400))
	}

	requiredFields.forEach((field) => {
		if (
			isRequired(
				field === 'rule' || field === 'data' ? req.body[field] : 'undefined'
			)
		) {
			console.log(field)
			return next(new ErrorResponse(`${field} is required.`, 400))
		} else if (
			field !== 'rule' &&
			field !== 'data' &&
			isRequired(rule[field])
		) {
			return next(new ErrorResponse(`${field} is required.`, 400))
		}
	})

	if (!isString(rule.field)) {
		return next(new ErrorResponse(`field should be a string.`, 400))
	}

	if (!isValidCondition(rule.condition)) {
		return next(
			new ErrorResponse(`condition should be a eq,neq,gt,gte or contains.`, 400)
		)
	}

	if (!isObject(data) && !isArray(data) && !isString(data)) {
		return next(
			new ErrorResponse(`data should be an object, array or string.`, 400)
		)
	}

	let checkCondition
	let nextedObjFieldValue

	let validationResponse = {
		error: false,
		field: rule.field,
		field_value: null,
		condition: rule.condition,
		condition_value: rule.condition_value,
	}

	if (isObject(data) && !isEmptyObject(data)) {
		const nextedObj = rule.field.split('.')
		console.log(nextedObj)
		if (
			(nextedObj.length === 0 && !data[rule.field]) ||
			(nextedObj.length > 0 && !data[nextedObj[0]][nextedObj[1]])
		) {
			return next(
				new ErrorResponse(`field ${rule.field} is missing from data.`, 400)
			)
		}

		nextedObjFieldValue =
			nextedObj.length > 0
				? data[nextedObj[0]][nextedObj[1]]
				: data[nextedObj[0]]

		checkCondition = validateCondition(
			rule.condition,
			nextedObjFieldValue,
			rule.condition_value
		)
		validationResponse.field_value = nextedObjFieldValue
	} else {
		if (!data[parseInt(rule.field)]) {
			return next(
				new ErrorResponse(`field ${rule.field} is missing from data.`, 400)
			)
		}

		checkCondition = validateCondition(
			rule.condition,
			data[parseInt(rule.field)],
			rule.condition_value
		)

		validationResponse.field_value = data[parseInt(rule.field)]
	}

	if (checkCondition) {
		validationResponse.error = false

		return res
			.status(200)
			.json(
				validationMessage(
					`field ${rule.field} successfully validated`,
					'success',
					validationResponse
				)
			)
	} else {
		validationResponse.error = true
		return res
			.status(400)
			.json(
				validationMessage(
					`field ${rule.field} failed validation`,
					'error',
					validationResponse
				)
			)
	}
}
