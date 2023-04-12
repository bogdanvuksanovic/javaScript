angular.module('Demo').controller('productDetailsController', productDetailsController);

productDetailsController.$inject = ['$http', '$stateParams', 'cartService'];

function productDetailsController($http, $stateParams, cartService) {
	var vm = this;
	vm.cart = [];

	cartService.getProductDetails().then(function (response) {
		vm.item = response;
	});

	vm.addToCart = function (product) {
		cartService.addToCart(product, vm.cart);
	};
}
