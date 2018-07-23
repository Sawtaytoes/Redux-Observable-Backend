const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

const {
	createConfigurationSet,
	createReduxStore,
	runTasks,
} = require('./')

of(createReduxStore({}))
.pipe(
	tap(createConfigurationSet({})),
	tap(runTasks('eslint')),
)
.subscribe()
