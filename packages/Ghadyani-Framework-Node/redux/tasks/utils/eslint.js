const { CLIEngine } = require('eslint')

module.exports = config => {
	const cli = (
		new CLIEngine({
			cache: true,
			fix: config.isLocalDevelopment,
		})
	)

	const { errorCount, results } = (
		cli
		.executeOnFiles(
			[
				'*.js',
				'@redux/configurations/utils/**/*',
				'@scripts/**/*',
			]
		)
	)

	const formatter = cli.getFormatter()

	const formattedResults = formatter(results)

	formattedResults
	&& console.info(formattedResults)

	errorCount > 0
	&& process.exit()
}
