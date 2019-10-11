const removeFilePathFromRequireCache = (
	filePath,
) => {
	delete require.cache[require.resolve(filePath)]

	return filePath
}

module.exports = removeFilePathFromRequireCache
