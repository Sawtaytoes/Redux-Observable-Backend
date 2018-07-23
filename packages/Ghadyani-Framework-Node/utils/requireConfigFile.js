const fs = require('fs')

const addRootFilePath = require('@utils/addRootFilePath')

const requireConfigFile = (filename, defaultValue) => {
	const filePath = addRootFilePath(filename)

	return (
		fs.existsSync(filePath)
		? require(filePath)
		: defaultValue
	)
}

module.exports = requireConfigFile
