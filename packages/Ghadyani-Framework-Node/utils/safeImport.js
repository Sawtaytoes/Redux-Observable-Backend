const fs = require('fs')

const safeImport = (
	(filePath, defaultValue) => (
		fs.existsSync(filePath)
		? require(filePath)
		: defaultValue
	)
)

module.exports = safeImport
