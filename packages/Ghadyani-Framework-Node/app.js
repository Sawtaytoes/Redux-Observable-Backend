const { applyMiddleware, createStore } = require('redux')
const { createEpicMiddleware } = require('redux-observable')
const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

// Include this import before other local imports.
const {
	createConfigurationSet,
	createReduxStore,
	runTasks,
} = require('./')

const createActionLoggerMiddleware = require('$redux/utils/createActionLoggerMiddleware')

const {
	rootEpic,
	rootReducer,
} = require('$redux')

const actionLoggerMiddleware = (
	createActionLoggerMiddleware()
)

const epicMiddleware = createEpicMiddleware()

const middleware = (
	applyMiddleware(
		actionLoggerMiddleware,
		epicMiddleware
	)
)

const store = (
	createStore(
		rootReducer,
		middleware,
	)
)

epicMiddleware
.run(rootEpic)

of(store)
.pipe(
	tap(createConfigurationSet({})),
	tap(runTasks('eslint')),
)
.subscribe()
