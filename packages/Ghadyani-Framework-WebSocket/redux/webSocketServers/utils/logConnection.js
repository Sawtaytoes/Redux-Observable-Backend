const chalk = require('chalk')
const { tap } = require('rxjs/operators')

const title = (
	chalk
	.greenBright
	.bgWhite
	.bold('[Client Connected]')
)

const logConnection = () => (
	tap(({ connection }) => {
		console.info(
			title,
			(
				chalk
				.green(
					connection
					.protocol
				)
			),
		)
	})
)

module.exports = logConnection
