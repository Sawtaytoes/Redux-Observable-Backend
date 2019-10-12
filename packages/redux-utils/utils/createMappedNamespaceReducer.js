const createNamespaceReducerCreator = require('./createNamespaceReducerCreator')

const getPreviousState = ({
	namespace,
	previousNamespaceState,
}) => (
	previousNamespaceState
	.get(namespace)
)

const removeNamespaceFromState = ({
	namespace,
	previousNamespaceState,
}) => {
	const nextNamespaceState = new Map(previousNamespaceState)

	nextNamespaceState
	.delete(namespace)

	return nextNamespaceState
}

const updateNamespaceState = ({
	namespace,
	nextState,
	previousNamespaceState,
}) => (
	new Map(previousNamespaceState)
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
