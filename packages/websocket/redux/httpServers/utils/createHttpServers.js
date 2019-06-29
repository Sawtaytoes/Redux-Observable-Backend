const { addHttpServer } = require('../actions')

const createHttpServers = (
	() => (
		({ dispatch }) => {
			dispatch(
				addHttpServer()
			)
		}
	)
)

module.exports = createHttpServers
