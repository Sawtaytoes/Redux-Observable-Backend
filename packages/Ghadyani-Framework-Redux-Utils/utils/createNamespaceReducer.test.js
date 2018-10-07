const test = require('ava')

const createReducer = require('./createReducer')
const createNamespaceReducer = require('./createNamespaceReducer')

const ADD_PAYLOAD = 'ADD_PAYLOAD'
const DO_NOT_EXECUTE = 'DO_NOT_EXECUTE'
const REMOVE_PAYLOAD = 'REMOVE_PAYLOAD'

const addPayload = (
	namespace,
	payload,
) => ({
	namespace,
	payload,
	type: ADD_PAYLOAD,
})

const removePayload = (
	namespace,
) => ({
	namespace,
	type: REMOVE_PAYLOAD,
})

const initialState = ''
const initialNamespaceState = {}

const reducerActions = {
	[ADD_PAYLOAD]: (
		(prevState, { payload }) => (
			payload
		)
	),

	[REMOVE_PAYLOAD]: (
		() => initialState
	),
}

const payloadReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

const namespacedPayloadReducer = (
	createNamespaceReducer(
		payloadReducer,
	)
)

test('Incorrect Initial Namespace State', t => {
	t.throws(() => (
		createNamespaceReducer(
			payloadReducer,
			'',
		)
	))
})

test('Non-Namespaced Action', t => {
	const action = { type: DO_NOT_EXECUTE }

	const state = (
		namespacedPayloadReducer(
			initialNamespaceState,
			action,
		)
	)

	const expectedState = initialNamespaceState

	t.is(
		state,
		expectedState,
		"State did not change"
	)
})

test('Random Namespaced Action', t => {
	const action = {
		type: DO_NOT_EXECUTE,
		namespace: 'DoNotExecute',
	}

	const state = (
		namespacedPayloadReducer(
			initialNamespaceState,
			action,
		)
	)

	const expectedState = initialNamespaceState

	t.is(
		state,
		expectedState,
		"State did not change"
	)
})

test('Add Payload', t => {
	const namespace = 'TextField'
	const payload = 'hi'

	const action = (
		addPayload(
			namespace,
			payload,
		)
	)

	const state = (
		namespacedPayloadReducer(
			initialNamespaceState,
			action,
		)
	)

	const expectedState = ({
		[namespace]: payload,
	})

	t.deepEqual(
		state,
		expectedState,
		"Added payload"
	)
})

test('Remove Payload', t => {
	const namespace = 'TextField'

	const state = (
		namespacedPayloadReducer(
			initialNamespaceState,
			removePayload(namespace),
		)
	)

	const expectedState = initialNamespaceState

	t.is(
		state,
		expectedState,
		"Removed payload"
	)
})

test('Remove Payload Twice', t => {
	const namespace = 'TextField'

	const state = (
		namespacedPayloadReducer(
			initialNamespaceState,
			removePayload(namespace),
		)
	)

	const expectedState = initialNamespaceState

	t.is(
		state,
		expectedState,
		"State is unchanged after a second payload removal",
	)
})

test('Add & Remove Payload', t => {
	const namespace = 'TextField'
	const payload = 'hi'

	const state = (
		[
			addPayload(namespace, payload),
			removePayload(namespace),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = initialNamespaceState

	t.deepEqual(
		state,
		expectedState,
		"Added & Removed payload",
	)
})

test('Add Multiple Same Payloads', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload = 'hi'

	const state = (
		[
			addPayload(namespace1, payload),
			addPayload(namespace2, payload),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = ({
		[namespace1]: payload,
		[namespace2]: payload,
	})

	t.deepEqual(
		state,
		expectedState,
		"Multiple same payloads added",
	)
})

test('Add Payload Twice & Remove Payload Once (FIFO)', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload = 'hi'

	const state = (
		[
			addPayload(namespace1, payload),
			addPayload(namespace2, payload),
			removePayload(namespace1),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = ({
		[namespace2]: payload,
	})

	t.deepEqual(
		state,
		expectedState,
		"Only second namespace remains",
	)
})

test('Add Payload Twice & Remove Payload Once (LIFO)', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload = 'hi'

	const state = (
		[
			addPayload(namespace1, payload),
			addPayload(namespace2, payload),
			removePayload(namespace2),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = ({
		[namespace1]: payload,
	})

	t.deepEqual(
		state,
		expectedState,
		"Only first namespace remains",
	)
})

test('Add Payload Twice & Remove Both', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload = 'hi'

	const state = (
		[
			addPayload(namespace1, payload),
			addPayload(namespace2, payload),
			removePayload(namespace1),
			removePayload(namespace2),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = initialNamespaceState

	t.deepEqual(
		state,
		expectedState,
		"No namespace remains after adding and removing both payloads",
	)
})

test('Add Multiple Different Payloads', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload1 = 'hi 1'
	const payload2 = 'hi 2'

	const state = (
		[
			addPayload(namespace1, payload1),
			addPayload(namespace2, payload2),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = {
		[namespace1]: payload1,
		[namespace2]: payload2,
	}

	t.deepEqual(
		state,
		expectedState,
		"Both different payloads added",
	)
})

test('Add Different Payloads & Remove One (FIFO)', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload1 = 'hi 1'
	const payload2 = 'hi 2'

	const state = (
		[
			addPayload(namespace1, payload1),
			addPayload(namespace2, payload2),
			removePayload(namespace1),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = ({
		[namespace2]: payload2,
	})

	t.deepEqual(
		state,
		expectedState,
		"Only second namespace remains",
	)
})

test('Add Different Payloads & Remove One (LIFO)', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload1 = 'hi 1'
	const payload2 = 'hi 2'

	const state = (
		[
			addPayload(namespace1, payload1),
			addPayload(namespace2, payload2),
			removePayload(namespace2),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = ({
		[namespace1]: payload1,
	})

	t.deepEqual(
		state,
		expectedState,
		"Only first namespace remains",
	)
})

test('Add Different Payloads & Remove Both', t => {
	const namespace1 = 'Namespace 1'
	const namespace2 = 'Namespace 2'
	const payload1 = 'hi 1'
	const payload2 = 'hi 2'

	const state = (
		[
			addPayload(namespace1, payload1),
			addPayload(namespace2, payload2),
			removePayload(namespace1),
			removePayload(namespace2),
		]
		.reduce(
			namespacedPayloadReducer,
			initialNamespaceState,
		)
	)

	const expectedState = initialNamespaceState

	t.deepEqual(
		state,
		expectedState,
		"No namespace remains after adding and removing both payloads",
	)
})
