const { CLIEngine } = require('eslint')

const runEslint = (
	config => {
		const cli = (
			new CLIEngine({
				cache: true,
				fix: config.isLocalDevelopment,
			})
		)

		const report = (
			cli
			.executeOnFiles([
				'**/*.js',
			])
		)

		CLIEngine
		.outputFixes(report)

		const { errorCount, results } = report

		const formatter = cli.getFormatter()

		const formattedResults = formatter(results)

		formattedResults
		&& console.info(formattedResults)

		errorCount > 0
		&& process.exit()
	}

)

module.exports = runEslint
