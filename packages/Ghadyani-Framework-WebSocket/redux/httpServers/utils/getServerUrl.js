const getServerUrl = ({
	hostname,
	port,
	protocol,
}) => (
	`${protocol}://`
	.concat(hostname || '0.0.0.0')
	.concat(`:${port}`)
)

module.exports = getServerUrl
