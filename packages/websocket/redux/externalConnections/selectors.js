const selectExternalConnection = ({
	namespace,
}) => ({
	externalConnections,
}) => (
	externalConnections
	.connection
	.get(namespace)
)

module.exports = {
	selectExternalConnection,
}
