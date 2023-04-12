angular.module('Demo').controller('productSearchController', productSearchController);

productSearchController.$inject = ['$http', '$stateParams', '$timeout', 'cartService'];

function productSearchController($http, $stateParams, $timeout, cartService) {
	var vm = this;

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	if ($stateParams.name) {
		$http({
			url: 'http://localhost:3000/items?name_like=' + $stateParams.name,
			method: 'get'
		}).then(function (response) {
			vm.items = response.data;
		});
	}
	vm.addToCart = function (product) {
		cartService.addToCart(product, vm.cart);
	};
	vm.cartTotal = function () {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (item) {
			totalPrice += item.price * item.quantity;
		});
		return totalPrice;
	};
	console.log(vm.cartTotal());

	vm.clearCart = function () {
		cartService.clearCart(vm.cart);
	};

	vm.removeItem = function (product) {
		cartService.removeItem(product, vm.cart);
	};

	vm.completeOrder = function () {
		cartService.completeOrder(vm.cart);
	};
}
