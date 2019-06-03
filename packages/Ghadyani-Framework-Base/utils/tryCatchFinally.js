const tryCatchFinally = ({
	defaultValue,
	finallyCallback = Function.prototype,
	tryCallback = Function.prototype,
}) => {
	try {
		return tryCallback()
	}
	catch(exception) {
		console
		.error(
			chalk
			.redBright(exception)
		)

		return defaultValue
	}
	finally {
		return finallyCallback()
	}
}

module.exports = tryCatchFinally
