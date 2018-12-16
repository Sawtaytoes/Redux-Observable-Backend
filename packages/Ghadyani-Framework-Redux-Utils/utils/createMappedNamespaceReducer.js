const createNamespaceReducerCreator = require('./createNamespaceReducerCreator')

const getPreviousState = ({
	namespace,
	prevNamespaceState,
}) => (
	prevNamespaceState
	.get(namespace)
)

const removeNamespaceFromState = ({
	namespace,
	prevNamespaceState,
}) => {
	const nextNamespaceState = new Map(prevNamespaceState)

	nextNamespaceState
	.delete(namespace)

	return nextNamespaceState
}

const updateNamespaceState = ({
	namespace,
	nextState,
	prevNamespaceState,
}) => (
	new Map(prevNamespaceState)
	.set(
		namespace,
		nextState,
	)
)

const createMappedNamespaceReducer = (
	reducer,
	initialNamespaceState = new Map(),
) => {
	if (!(initialNamespaceState instanceof Map)) {
		throw new Error(
			"`initialNamespaceState` not set to type `Map` in `createMappedNamespaceReducer`."
		)
	}

	return (
		createNamespaceReducerCreator(
			reducer,
			initialNamespaceState,
			{
				getPreviousState,
				removeNamespaceFromState,
				updateNamespaceState,
			},
		)
	)
}

module.exports = createMappedNamespaceReducer
