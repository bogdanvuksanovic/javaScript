angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['$http', '$state', 'cartService', '$timeout'];

function homeController($http, $state, cartService, $timeout) {
	var vm = this;
	vm.cart = [];
	vm.cartIsOpen = false;
	vm.isEmptyingBasket = false;
	vm.searchItem = searchItem;
	vm.updateQuantity = updateQuantity;
	vm.addToCart = addToCart;
	vm.cartTotal = cartTotal;
	vm.clearCart = clearCart;
	vm.removeItem = removeItem;
	vm.cartTotalQuantity = cartTotalQuantity;
	vm.completeOrder = completeOrder;

	cartService.getProducts().then(function (response) {
		vm.items = response;
	});

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	function searchItem() {
		if (vm.name) {
			$state.go('productSearch', { name: vm.name });
		} else {
			$state.go('home');
		}
	}

	function updateQuantity(product) {
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
	}

	function addToCart(product) {
		cartService.addToCart(product, vm.cart);
		console.log(vm.cart);
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

	function removeItem(product) {
		cartService.removeItem(product, vm.cart);
	}

	function cartTotalQuantity() {
		var totalQuantity = 0;
		angular.forEach(vm.cart, function (product) {
			totalQuantity += product.quantity;
		});
		return totalQuantity;
	}

	function completeOrder() {
		cartService.completeOrder(vm.cart, vm.isEmptyingBasket);
	}
}
