const fs = require('fs')
const path = require('path')

const getOverrideOrOriginalFile = require('scripts/utils/getOverrideOrOriginalFile')

// `fs.realpathSync` added for monorepos
const basePath = (
	fs
	.realpathSync(
		process.cwd()
	)
)

const localScripts = (
	path
	.dirname(
		require
		.resolve('scripts')
	)
)

const localBasePath = (
	path
	.join(
		localScripts,
		'..'
	)
)

const getRootFilePath = (
	getOverrideOrOriginalFile(
		basePath,
		localBasePath
	)
)

module.exports = getRootFilePath
