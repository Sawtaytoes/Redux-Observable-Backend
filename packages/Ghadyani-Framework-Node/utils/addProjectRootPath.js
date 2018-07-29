const fs = require('fs')
const path = require('path')

// Added `fs.realpathSync` for monorepos
const basePath = (
	fs
	.realpathSync(
		process.cwd()
	)
)

const addProjectRootPath = (
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

module.exports = addProjectRootPath
