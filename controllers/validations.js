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
