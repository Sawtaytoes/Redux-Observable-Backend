const { concat, map, mapTo, mergeAll, switchMap } = require('rxjs/operators')
const { of, range, throwError, timer } = require('rxjs')

range(1, 4)
.pipe(
	map(value => (
		timer(10)
		.pipe(
			mapTo({
				type: 'UPDATE_VALUE',
				value: value + 1,
			}),
			switchMap(action => (
				action.value !== 2
				? of(action)
				: throwError(new Error('howdy!'))
			)),
		)
	)),
	mergeAll(2),
	concat(
		of({
			type: 'ALL_DONE',
		})
	),
)
.subscribe(console.log, console.error)
