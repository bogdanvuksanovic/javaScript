angular.module('Demo').controller('productDetailsController', productDetailsController);

productDetailsController.$inject = ['$http', '$stateParams', 'cartService'];

function productDetailsController($http, cartService, $stateParams) {
	var vm = this;
	vm.cart = [];
	vm.addToCart = addToCart;

	// cartService.getProductDetails().then(function (response) {
	// 	vm.item = response;
	// });

	$http({
		url: 'http://localhost:3000/items',
		params: { id: $stateParams.id },
		method: 'get'
	}).then(function (response) {
		vm.item = response.data[0];
	});

	function addToCart(product) {
		cartService.addToCart(product, vm.cart);
	}
}
