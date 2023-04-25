angular.module('Demo', ['ui.router']).config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/home');
	$urlMatcherFactoryProvider.caseInsensitive(true);
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: './templates/home.html',
			controller: 'homeController',
			controllerAs: 'vm'
		})
		.state('productDetails', {
			url: '/productDetails/:id',
			templateUrl: './templates/productDetails.html',
			controller: 'productDetailsController',
			controllerAs: 'vm'
		});
	$locationProvider.html5Mode(true);
});
