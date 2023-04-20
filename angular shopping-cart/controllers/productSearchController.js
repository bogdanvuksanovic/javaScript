angular.module('Demo').controller('productSearchController', productSearchController);

productSearchController.$inject = ['$http', '$stateParams', 'cartService'];

function productSearchController($http, $stateParams, cartService) {
	var vm = this;
	vm.addToCart = addToCart;
	vm.cartTotal = cartTotal;
	vm.clearCart = clearCart;
	vm.removeItem = removeItem;
	vm.completeOrder = completeOrder;

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	cartService.getSearchedData().then(function (response) {
		vm.items = response;
	});

	function addToCart(product) {
		cartService.addToCart(product, vm.cart);
	}
	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (item) {
			totalPrice += item.price * item.quantity;
		});
		return totalPrice;
	}
	console.log(vm.cartTotal());

	function clearCart() {
		cartService.clearCart(vm.cart);
	}

	function removeItem(items) {
		cartService.removeItem(items, vm.cart);
	}

	function completeOrder() {
		cartService.completeOrder(vm.cart);
	}
}
