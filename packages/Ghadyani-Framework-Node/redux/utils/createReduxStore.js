const { applyMiddleware, createStore } = require('redux')
const { combineEpics } = require('redux-observable')
const { combineReducers } = require('redux')
const { createEpicMiddleware } = require('redux-observable')

const actionLoggerMiddleware = require('@redux/utils/actionLoggerMiddleware')

const {
	rootEpic,
	rootReducers,
} = require('@redux')

const createReduxStore = ({
	additionalEpics = combineEpics(),
	additionalReducers,
}) => {
	const epicMiddleware = createEpicMiddleware()

	const middleware = (
		applyMiddleware(
			actionLoggerMiddleware,
			epicMiddleware
		)
	)

	const rootReducer = (
		combineReducers({
			...rootReducers,
			...additionalReducers,
		})
	)

	const store = (
		createStore(
			rootReducer,
			middleware,
		)
	)

	epicMiddleware
	.run(
		combineEpics(
			rootEpic,
			additionalEpics,
		)
	)

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
