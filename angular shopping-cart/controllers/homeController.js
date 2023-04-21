angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['cartService'];

function homeController(cartService) {
	var vm = this;
	vm.cart = [];
	vm.cartIsOpen = false;
	vm.isEmptyingBasket = false;
	vm.searchText = '';
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

	function searchItem(item) {
		cartService.searchItem(vm.name);
		if (vm.searchText == undefined) {
			return true;
		} else {
			if (item.name.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1) {
				return true;
			}
		}
		return false;
	}

	vm.liveSearch = function () {
		vm.searchItem = { name: vm.searchText };
	};

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
	}

	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (item) {
			totalPrice += item.price * item.quantity;
		});
		return totalPrice;
	}

	function clearCart() {
		vm.isEmptyingBasket = true;
		cartService.clearCart(vm.cart).then(function () {
			vm.isEmptyingBasket = false;
		});
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
		vm.isEmptyingBasket = true;
		cartService.completeOrder(vm.cart).then(function () {
			vm.isEmptyingBasket = false;
		});
	}
}
