const yargs = require('yargs')
const { of } = require('rxjs')
const { pluck, tap } = require('rxjs/operators')

const eslint = () => (
	require('scripts/tester/eslint')()
)

const defaultTaskNames = {
	lint: eslint,
	undefined: eslint,
}

const runTask = (
	taskNames => (
		of({
			...defaultTaskNames,
			...taskNames,
		})
		.pipe(
			pluck(yargs.argv.task),
			tap(task => task()),
		)
	)
)

module.exports = runTask
