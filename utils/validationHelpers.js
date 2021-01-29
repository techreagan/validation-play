exports.isRequired = (variable) => {
	if (typeof variable === 'undefined') return true
	return false
}

exports.isObject = (variable) => {
	return Object.prototype.toString.call(variable) === '[object Object]'
}

exports.isEmptyObject = (variable) => {
	return Object.keys(variable).length === 0
}

exports.isArray = (variable) => {
	return Array.isArray(variable)
}

exports.isString = (variable) => {
	return Object.prototype.toString.call(variable) === '[object String]'
}

exports.isInt = (variable) => {
	return Object.prototype.toString.call(variable) === '[object Number]'
}

exports.isValidCondition = (variable) => {
	return /^\b(eq|neq|gt|gte|contains)\b$/.test(variable)
}

exports.validateCondition = (condition, fieldValue, conditionValue) => {
	let value

	switch (condition) {
		case 'eq':
			value = fieldValue === conditionValue
			break
		case 'neq':
			value = fieldValue !== conditionValue
			break
		case 'gt':
			value = fieldValue > conditionValue
			break
		case 'gte':
			value = fieldValue >= conditionValue
			break
		case 'contains':
			// if (this.isString(conditionValue)) {
			value = fieldValue.includes(conditionValue)
			break
		// } else if (this.isArray(conditionValue)) {
		// value = fieldValue.contains(conditionValue)
		// }
		default:
			value = false
	}

	return value
}

exports.validationMessage = (message, status, validation) => {
	return {
		message,
		status,
		data: {
			validation,
		},
	}
}
