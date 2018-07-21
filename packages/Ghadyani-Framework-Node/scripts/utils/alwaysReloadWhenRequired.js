const config = require('config')

module.exports = filePath => {
	config.isLocalDevelopment()
	&& (delete require.cache[require.resolve(filePath)])

	return filePath
}
