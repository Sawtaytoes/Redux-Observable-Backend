const { catchError, throwError, concat, of } = require('rxjs')

try {
	const result = concat(of(7), throwError(new Error('oops!')))

	result
	.pipe(
		// catchError(() => of(null))
	)
	.subscribe(console.log, console.error)
}
catch(e) {
	// Nothing
	console.log('caught')
}
// Logs:
// 7
// Error: oops!

console.log('yo')
