const removeFilePathFromRequireCache = (
	({ isLocalDevelopment }) => (
		filePath => {
				isLocalDevelopment
				&& (delete require.cache[require.resolve(filePath)])

				return filePath
			}
	)
)

module.exports = removeFilePathFromRequireCache
