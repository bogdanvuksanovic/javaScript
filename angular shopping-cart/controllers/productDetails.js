angular.module('Demo').controller('productDetailsController', productDetailsController);

productDetailsController.$inject = ['cartService', '$timeout'];

function productDetailsController(cartService, $timeout) {
	var vm = this;
	vm.cart = [];
	vm.addToCart = addToCart;
	vm.addedProduct = false;

	cartService.getProductDetails().then(function (response) {
		vm.item = response;
	});

	function init() {
		cartService.getCartData().then(function (response) {
			vm.cart = response;
		});
	}

	function addToCart(product) {
		vm.addedProduct = true;
		cartService.addToCart(product, vm.cart);
		$timeout(function () {
			vm.addedProduct = false;
		}, 1000);
		console.log(vm.cart);
	}

	init();
}
