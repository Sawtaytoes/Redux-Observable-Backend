const { createDeprecatedFunction } = require('@redux-observable-backend/core')

const selectHttpServer = () => ({
	httpServers,
}) => (
	httpServers
	.server
)

module.exports = {
	httpServerSelector: (
		createDeprecatedFunction({
			adapter: (state, props) => selectHttpServer(props)(state),
			deprecatedMethodName: 'httpServerSelector',
			replacementMethodName: 'selectHttpServer',
		})
	),
	selectHttpServer,
}
