const url = require('url')

const getQueryParamsFromRequest = req => (
	url
	.parse(req.url, true)
	.query
)

module.exports = getQueryParamsFromRequest
