const childProcess = require('child_process')

const getGitCommit = () => {
	try {
		return (
			childProcess
			.execSync(
				'git log -1 --pretty=format:"%h"'
			)
			.toString()
		)
	}
	catch(exception) {
		return 'NO_GIT_VERSION'
	}
}

module.exports = getGitCommit
