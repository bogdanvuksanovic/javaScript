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
		// .state('items', {
		// 	url: '/cart',
		// 	templateUrl: './templates/cart.html',
		// 	controller: 'itemsController',
		// 	controllerAs: 'vm'
		// })
		// .state('productSearch', {
		// 	url: '/home/:name',
		// 	templateUrl: './templates/home.html',
		// 	controller: 'productSearchController',
		// 	controllerAs: 'vm'
		// })
		.state('productDetails', {
			url: '/productDetails/:id',
			templateUrl: './templates/productDetails.html',
			controller: 'productDetailsController',
			controllerAs: 'vm'
		});
	$locationProvider.html5Mode(true);
});
