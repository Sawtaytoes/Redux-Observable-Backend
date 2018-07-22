const getServerUrl = config => (
	`${config.protocol}://`
	.concat('0.0.0.0')
	.concat(`:${config.port}`)
)

module.exports = getServerUrl
