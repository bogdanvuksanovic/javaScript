angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['cartService'];

function homeController(cartService) {
	var vm = this;
	vm.cart = [];
	vm.cartIsOpen = false;
	vm.isEmptyingBasket = false;
	vm.messageQuantity = false;
	vm.execute = true;
	vm.searchText = '';
	vm.liveSearch = liveSearch;
	vm.updateQuantity = updateQuantity;
	vm.addToCart = addToCart;
	vm.cartTotal = cartTotal;
	vm.clearCart = clearCart;
	vm.removeItem = removeItem;
	vm.cartTotalQuantity = cartTotalQuantity;
	vm.completeOrder = completeOrder;
	vm.totalItem = totalItem;

	cartService.getProducts().then(function (response) {
		vm.items = response;
	});

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	function liveSearch() {
		vm.searchItem = { name: vm.searchText };
	}

	function updateQuantity(product) {
		if (product.quantity < 1 || product.quantity > 999) {
			vm.messageQuantity = true;
			vm.execute = false;
		} else {
			vm.messageQuantity = false;
			vm.execute = true;
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
	}

	function addToCart(product) {
		cartService.addToCart(product, vm.cart);
	}

	function totalItem(product) {
		var totalItem;
		if (vm.execute) {
			totalItem = product.quantity * product.price;
		} else {
			totalItem = 0;
		}
		return totalItem;
	}

	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (item) {
			totalPrice += totalItem(item);
		});
		return totalPrice;
	}

	function clearCart() {
		if (vm.cart.length == 0) {
			alert('Your basket is empty!');
		} else {
			vm.isEmptyingBasket = true;
			cartService.clearCart(vm.cart).then(function () {
				vm.isEmptyingBasket = false;
			});
		}
	}

	function removeItem(product) {
		cartService.removeItem(product, vm.cart);
	}

	function cartTotalQuantity() {
		var totalQuantity = 0;
		if (vm.execute) {
			angular.forEach(vm.cart, function (product) {
				totalQuantity += product.quantity;
			});
		} else {
			totalQuantity = 0;
		}
		return totalQuantity;
	}

	function completeOrder() {
		if (vm.cart.length == 0) {
			alert('Your basket is empty!');
		} else if (vm.execute == false) {
			alert('Quantity must be between 1 and 999');
		} else {
			vm.isEmptyingBasket = true;
			cartService.completeOrder(vm.cart).then(function () {
				vm.isEmptyingBasket = false;
			});
		}
	}
}
