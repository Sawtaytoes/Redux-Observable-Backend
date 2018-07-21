const { CLIEngine } = require('eslint')

const config = require('config')

module.exports = () => {
	const cli = (
		new CLIEngine({
			cache: true,
			fix: config.isLocalDevelopment(),
		})
	)

	const { errorCount, results } = (
		cli
		.executeOnFiles(
			[
				'*.js',
				'config/**/*',
				'scripts/**/*',
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
