const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')
const { bindNodeCallback, NEVER, of } = require('rxjs')
const { catchError, map, switchMap } = require('rxjs/operators')

const config = require('config')
const getQueryParamsFromRequest = require('$$utils/getQueryParamsFromRequest')

const serverConfig = config.getServerConfig()
const { ops_singleSignOn } = config.getFeatureFlags()

const jwksUri = (
	'https://'
	.concat(serverConfig.auth0.domain)
	.concat('/.well-known/jwks.json')
)

const client = (
	jwksClient({
		cache: true,
		jwksUri,
		rateLimit: true,
	})
)

const getSigningKeyObservable = (
	bindNodeCallback(
		client
		.getSigningKey
	)
)

const verifyJwtObservable = (
	bindNodeCallback(
		jwt
		.verify
	)
)

const logErrorAndFailVerification = ({
	connectionVerified,
	error,
	message,
}) => {
	const errorMessage = (
		error
		? error.message || error
		: message
	)

	console.error(errorMessage)

	connectionVerified(
		false,
		401,
		`[TOKEN VERIFICATION ERROR] ${errorMessage}`
	)
}

const sendErrorMessage = (connectionVerified, message) => (
	catchError(error => {
		logErrorAndFailVerification({
			connectionVerified,
			error,
			message,
		})

		return NEVER
	})
)

const verifyConnectionObservable = (connectionVerified, token) => (
	of(token)
	.pipe(
		map(token => ({
			kid: (
				jwt
				.decode(
					token,
					{ complete: true }
				)
				.header
				.kid
			),
			token,
		})),
		switchMap(({ kid, token }) => (
			getSigningKeyObservable(kid)
			.pipe(
				sendErrorMessage(
					connectionVerified,
					"No match for token's signing key."
				),
				map(key => (
					key.publicKey
					|| key.rsaPublicKey
				)),
				sendErrorMessage(
					connectionVerified,
					"No signing key available for token."
				),
				switchMap(signingKey => (
					verifyJwtObservable(
						token,
						signingKey
					)
					.pipe(
						catchError(error => {
							console.error(
								error.name,
								error.message
							)

							connectionVerified(
								false,
								401,
								error.message
							)

							return NEVER
						}),
					)
				)),
			)
		))
	)
)

const verifyConnectionAuthToken = ({ req }, connectionVerified) => {
	ops_singleSignOn
	? (
		verifyConnectionObservable(
			connectionVerified,
			(
				getQueryParamsFromRequest(req)
				.token
			)
		)
		.subscribe({
			error: error => (
				logErrorAndFailVerification({
					connectionVerified,
					error,
				})
			),
			next: () => (
				connectionVerified(true)
			),
		})
	)
	: connectionVerified(true)
}

module.exports = verifyConnectionAuthToken
