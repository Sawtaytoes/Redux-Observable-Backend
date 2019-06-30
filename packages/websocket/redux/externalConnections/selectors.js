const selectExternalConnection = ({
	namespace,
}) => ({
	externalConnections,
}) => (
	externalConnections
	.externalConnectionsList
	.get(namespace)
)

module.exports = {
	selectExternalConnection,
}
