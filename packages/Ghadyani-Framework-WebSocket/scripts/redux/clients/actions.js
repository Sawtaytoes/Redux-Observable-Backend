const ADD_CLIENT = 'CLIENTS::ADD_CLIENT'
const REMOVE_CLIENT = 'CLIENTS::REMOVE_CLIENT'

const addClient = (
	({ connection }) => ({
		connection,
		type: ADD_CLIENT,
	})
)

const removeClient = (
	connection => ({
		connection,
		type: REMOVE_CLIENT,
	})
)

module.exports = {
	ADD_CLIENT,
	addClient,
	REMOVE_CLIENT,
	removeClient,
}
