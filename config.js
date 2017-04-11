
module.exports = {

	paths: {
		mainJs: './src/main.js',
		js: ['./src/**/*.js', './config.js'],
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/**/*.css',
			'node_modules/toastr/toastr.scss'
		],
		assets: '../assets'		
	},

	routerType: require('react-router').browserHistory,
	ReactComponent: require('React').PureComponent,

	debugging: true,
	updateReports: {update:false, pass:false},
	renderLogging: false,
	renderLoggingInputs: false,
	ajaxLogging: true,

	stateTracker: false,
	reduxDevtools: false
	
};