module.exports = (req, res) => (
	res
	.status(500)
	.end('Requested template not available.')
)
