const fs = require('fs')

module.exports = httpServerConfig => {
	const https = require('https')
	const enforce = require('express-sslify')

	httpServerConfig
	.use(enforce.HTTPS({ trustProtoHeader: true }))

	return (
		https.createServer(
			{
				cert: fs.readFileSync('./cert/domain-crt.txt'),
				key: fs.readFileSync('./cert/key.pem'),
			},
			httpServerConfig
		)
	)
}
