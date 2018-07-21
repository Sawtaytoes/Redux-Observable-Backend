const { map } = require('rxjs/operators')

const { verifyAccessRights } = require('scripts/redux/permissions/actions')

const mapToAccessPermissions = actionCreator => (
	map(props => (
		verifyAccessRights({
			action: actionCreator(props),
			namespace: (
				props.namespace

				// Legacy functions that need to be rewritten
				|| props.connection
			),
		})
	))
)

module.exports = mapToAccessPermissions
