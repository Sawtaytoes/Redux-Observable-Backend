const { of } = require('rxjs')
const { tap } = require('rxjs/operators')

const {
	createAndRunTasks,
	createConfigurationSet,
	createReduxStore,
} = require('./')

of(createReduxStore({}))
.pipe(
	tap(createConfigurationSet({})),
	tap(createAndRunTasks()),
)
.subscribe()
