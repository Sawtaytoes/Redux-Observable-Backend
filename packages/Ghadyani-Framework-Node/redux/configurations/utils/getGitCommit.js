const childProcess = require('child_process')

const getGitCommit = () => (
	childProcess
	.execSync(
		'git log -1 --pretty=format:"%h"'
	)
	.toString()
)

module.exports = getGitCommit
