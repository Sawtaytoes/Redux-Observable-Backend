const defaultConfigurationSet = {
	// Use either 'development' or 'production' to mimic NODE_ENV changes.
	nodeEnv: 'development',

	// Enables watching the filesystem for local development.
	isLocalDevelopment: true,

	// Changes the way Webpack and Nodemon poll for file changes.
	isDocker: false,


	// -----------------------------------------
	// Application
	// -----------------------------------------

	// Feature Flag identifier defaults
	applicationName: 'Unnamed Application',
	environmentName: 'lol',

	// Denotes usage in an iframe
	isUsedAsIFrame: false,

	// Domains used when setting up CORS and Content Security Policies
	validDomains: '',


	// -----------------------------------------
	// Server
	// -----------------------------------------

	// Using `https` requires valid certificates
	protocol: 'http',

	// Can be 0.0.0.0 for binding to all IPs
	hostname: '0.0.0.0',

	// Port of webserver
	port: 3000,

	// CNAME'd address record used as `window.origin`
	// Format as: https://test.example.com
	hostedAddress: '',
}

module.exports = defaultConfigurationSet
