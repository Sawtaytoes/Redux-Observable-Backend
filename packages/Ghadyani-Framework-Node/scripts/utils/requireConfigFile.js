const fs = require('fs')

const getRootFilePath = require('scripts/utils/getRootFilePath')

const requireConfigFile = (filename, defaultValue) => {
	const filePath = `${getRootFilePath(filename)}.js`

	return (
		fs.existsSync(filePath)
		? require(filePath)
		: defaultValue
	)
}

module.exports = requireConfigFile
