const { createDeprecatedFunction } = require('@redux-observable-backend/core')

const httpServerSelector = (
	({ httpServers }) => (
		httpServers
		.server
	)
)

module.exports = {
	getHttpServer: (
		createDeprecatedFunction({
			deprecatedMethodName: 'getHttpServer',
			func: httpServerSelector,
			replacementMethodName: 'httpServerSelector',
		})
	),
	httpServerSelector,
}
