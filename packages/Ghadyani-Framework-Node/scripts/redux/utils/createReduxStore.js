const { applyMiddleware, createStore } = require('redux')
const { combineReducers } = require('redux')
const { createEpicMiddleware } = require('redux-observable')

const actionLoggerMiddleware = require('scripts/redux/utils/actionLoggerMiddleware')

const {
	rootEpic,
	rootReducers,
} = require('scripts/redux')

const createReduxStore = () => {
	const epicMiddleware = createEpicMiddleware()

	const middleware = (
		applyMiddleware(
			actionLoggerMiddleware,
			epicMiddleware
		)
	)

	const rootReducer = combineReducers(rootReducers)

	const store = (
		createStore(
			rootReducer,
			middleware,
		)
	)

	epicMiddleware
	.run(rootEpic)

	const actionDispatch = (
		action => () => (
			store
			.dispatch(action)
		)
	)

	const curriedDispatch = (
		func => (...args) => (
			store
			.dispatch(
				func(...args)
			)
		)
	)

	const splitDispatch = (
		func => (...args) => () => (
			store
			.dispatch(
				func(...args)
			)
		)
	)

	return {
		...store,
		actionDispatch,
		curriedDispatch,
		splitDispatch,
	}
}

module.exports = createReduxStore
