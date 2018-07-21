const isEqual = require('is-equal')

const hasNamespace = namespace => namespace !== undefined
const hasState = state => state !== undefined
const isSameStateReference = (newState, oldState) => newState === oldState

const namespaceReducer = reducer => {
	const initialState = reducer(undefined, {})

	return (
		(prevState = new Map(), action) => {
			const { namespace } = action

			// Added for early-fail performance improvments.
			// Namespace Reducers only care when there is a `namespace`.
			if (!hasNamespace(namespace)) {
				return prevState
			}

			const prevNamespaceState = prevState.get(namespace)
			const nextNamespaceState = reducer(prevNamespaceState, action)

			// If `nextNamespaceState` changed after reducing, that means `action.type` was used in `reducer`.
			if (isSameStateReference(nextNamespaceState, prevNamespaceState)) {
				return prevState
			}

			// If the namespace state is back to its initial values, it can be safely removed.
			// Setting `nextNamespaceState` to `initialState` means "remove me".
			const isNamespaceStateReset = isEqual(nextNamespaceState, initialState)

			// If there wasn't already a state for this namespace, then there are no changes.
			if (
				isNamespaceStateReset
				&& !hasState(prevNamespaceState)
			) {
				return prevState
			}

			// We can remove this namespace from our `nextState` since it no longer has values we care about.
			if (isNamespaceStateReset) {
				const nextState = new Map(prevState)

				nextState.delete(namespace)

				return nextState
			}

			// At this point, we've determined this namespace needs to be updated in our state
			return (
				new Map(prevState)
				.set(namespace, nextNamespaceState)
			)
		}
	)
}

module.exports = namespaceReducer
