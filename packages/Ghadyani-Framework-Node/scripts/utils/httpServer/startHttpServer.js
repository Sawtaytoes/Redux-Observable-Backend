const config = require('config')
const getSecureHttpServerConfig = require('scripts/utils/httpServer/getSecureHttpServerConfig')
const onListening = require('scripts/utils/onListening')

const startHttpServer = httpServerConfig => (
	(
		config.isSecure()
		? getSecureHttpServerConfig(httpServerConfig)
		: httpServerConfig
	)
	.listen(
		config.getPort(),
		onListening('Web Server running as', config.getServerUrl())
	)
)

module.exports = startHttpServer
