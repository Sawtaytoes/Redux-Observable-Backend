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
			deprecatedMethodName: 'httpServerSelector',
			func: (state, props) => selectHttpServer(props)(state),
			replacementMethodName: 'selectHttpServer',
		})
	),
	selectHttpServer,
}
