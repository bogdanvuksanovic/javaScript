angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['$http', '$state', 'cartService', '$timeout'];

function homeController($http, $state, cartService, $timeout) {
	var vm = this;
	vm.cart = [];
	vm.cartIsOpen = false;
	vm.isEmptyingBasket = false;

	cartService.getProducts().then(function (response) {
		vm.items = response;
	});

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	vm.searchItem = function () {
		if (vm.name) {
			$state.go('productSearch', { name: vm.name });
		} else {
			$state.go('home');
		}
	};

	vm.updateQuantity = function (product) {
		cartService
			.updateCartItem(product)
			.then(function (response) {
				for (var i = 0; i < vm.cart.length; i++) {
					if (vm.cart[i].id === product.id) {
						vm.cart[i].quantity = product.quantity;
					}
				}
			})
			.catch(function (error) {
				console.error('Error updating cart:', error);
			});
	};

	vm.addToCart = function (product) {
		cartService.addToCart(product, vm.cart);
		console.log(vm.cart);
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

	vm.cartTotalQuantity = function () {
		var totalQuantity = 0;
		angular.forEach(vm.cart, function (product) {
			totalQuantity += product.quantity;
		});
		return totalQuantity;
	};

	vm.completeOrder = function () {
		cartService.completeOrder(vm.cart, vm.isEmptyingBasket);
	};
}
