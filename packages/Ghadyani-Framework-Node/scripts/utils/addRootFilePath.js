const fs = require('fs')
const path = require('path')

// Added `fs.realpathSync` for monorepos
const basePath = (
	fs
	.realpathSync(
		process.cwd()
	)
)

const addRootFilePath = (
	(filename, extension = '.js') => (
		path
		.join(
			basePath,
			(
				filename
				.concat(extension)
			),
		)
	)
)

module.exports = addRootFilePath
