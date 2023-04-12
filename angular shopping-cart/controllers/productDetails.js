angular.module('Demo').controller('productDetailsController', productDetailsController);

productDetailsController.$inject = ['$http', '$stateParams', 'cartService'];

function productDetailsController($http, $stateParams, cartService) {
	var vm = this;
	vm.cart = [];

	$http({
		url: 'http://localhost:3000/items',
		params: { id: $stateParams.id },
		method: 'get'
	}).then(function (response) {
		vm.item = response.data[0];
		console.log(response);
	});

	vm.addToCart = function (product) {
		cartService.addToCart(product);
		cartService.getCartData().then(function (response) {
			vm.cart = response;
		});
		console.log(vm.cart);
	};
}
