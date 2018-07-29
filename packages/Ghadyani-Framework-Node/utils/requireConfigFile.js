const fs = require('fs')

const addProjectRootPath = require('$utils/addProjectRootPath')

const requireConfigFile = (filename, defaultValue) => {
	const filePath = addProjectRootPath(filename)

	return (
		fs.existsSync(filePath)
		? require(filePath)
		: defaultValue
	)
}

module.exports = requireConfigFile
