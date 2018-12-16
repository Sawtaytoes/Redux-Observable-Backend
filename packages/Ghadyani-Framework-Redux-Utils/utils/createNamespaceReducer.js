const createNamespaceReducerCreator = require('./createNamespaceReducerCreator')

const compareStates = ({
	initialState,
	nextState,
}) => (
	isEqual(
		nextState,
		initialState,
	)
)

const getPreviousState = ({
	namespace,
	prevNamespaceState,
}) => (
	prevNamespaceState[namespace]
)

const removeNamespaceFromState = ({
	namespace,
	prevNamespaceState,
}) => {
	const nextNamespaceState = { ...prevNamespaceState }

	delete nextNamespaceState[namespace]

	return nextNamespaceState
}

const updateNamespaceState = ({
	namespace,
	nextState,
	prevNamespaceState,
}) => ({
	...prevNamespaceState,
	[namespace]: nextState,
})

const createNamespaceReducer = (
	reducer,
	initialNamespaceState = {},
) => {
	if (typeof initialNamespaceState !== 'object') {
		throw new Error(
			"`initialNamespaceState` not set to type `object` in `createNamespaceReducer`."
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

module.exports = createNamespaceReducer
