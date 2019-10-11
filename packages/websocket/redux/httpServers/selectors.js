const { createDeprecationFunction } = require('@redux-observable-backend/core')

const selectHttpServer = () => ({
	httpServers,
}) => (
	httpServers
	.server
)

module.exports = {
	httpServerSelector: (
		createDeprecationFunction({
			adapter: (state, props) => selectHttpServer(props)(state),
			deprecatedMethodName: 'httpServerSelector',
			replacementMethodName: 'selectHttpServer',
		})
	),
	selectHttpServer,
}
