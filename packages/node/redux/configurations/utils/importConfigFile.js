const fs = require('fs')

const addProjectRootPath = require('./addProjectRootPath')

const importConfigFile = (
	(filename, defaultValue) => {
		const filePath = addProjectRootPath(filename)

		return (
			fs.existsSync(filePath)
			? require(filePath)
			: defaultValue
		)
	}
)

module.exports = importConfigFile
