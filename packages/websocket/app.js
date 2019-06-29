// Include this import before other local imports.
require('better-module-alias')(__dirname)

const { applyMiddleware, createStore } = require('redux')
const { createActionLoggerMiddleware } = require('@redux-observable-backend/redux-utils')
const { createConfigurationSet, runTasks } = require('@redux-observable-backend/node')
const { createEpicMiddleware } = require('redux-observable')
const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

const {
	createHttpServers,
	createWebSocketServers,
} = require('./')

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
	tap(createHttpServers()),
	tap(createWebSocketServers()),
	tap(
		runTasks(
			'lint',
			'serve',
		)
	),
)
.subscribe()
