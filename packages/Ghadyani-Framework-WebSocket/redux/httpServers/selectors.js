const { createDeprecationMessage } = require('@ghadyani-framework/base')

const httpServerSelector = (
	({ httpServers }) => (
		httpServers
		.server
	)
)

module.exports = {
	getHttpServer: (
		createDeprecationMessage({
			deprecatedMethodName: 'getHttpServer',
			func: httpServerSelector,
			replacementMethodName: 'httpServerSelector',
		})
	),
	httpServerSelector,
}
