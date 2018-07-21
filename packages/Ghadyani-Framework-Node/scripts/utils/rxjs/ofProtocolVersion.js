const { filter } = require('rxjs/operators')

const ofProtocolVersion = protocolVersion => (
	filter(({ connection }) => connection.protocol === protocolVersion)
)

module.exports = ofProtocolVersion
