const fs = require('fs')
const path = require('path')

const getOverrideOrOriginalFile = (
	(overridePath, originalPath) => (
		(filename, extension = 'js') => {
			const hasFileOverride = (
				path.join(overridePath, `${filename}.${extension}`)
			)

			return (
				fs.existsSync(hasFileOverride)
				? path.join(overridePath, filename)
				: path.join(originalPath, filename)
			)
		}
	)
)

module.exports = getOverrideOrOriginalFile
