angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['$http', '$state', 'cartService'];

function homeController($http, $state, cartService) {
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

	vm.addToCart = function (product) {
		cartService.addToCart(product);
		cartService.getCartData().then(function (response) {
			vm.cart = response;
		});
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
		vm.cart = [];
		vm.cartTotal();
		$http.post('http://localhost:3000/cart', vm.cart);
	};

	vm.removeItem = function (product) {
		$http;
		cartService
			.removeCartItem(product)
			.then(function (response) {
				var index = vm.cart.findIndex(function (item) {
					return item.id === product.id;
				});
				vm.cart.splice(index, 1);
				console.log('Successfully deleted item with id:', product);
			})
			.catch(function (error) {
				console.log(error);
				console.log(product.id);
			});
	};

	vm.cartTotalQuantity = function () {
		var totalQuantity = 0;
		angular.forEach(vm.cart, function (product) {
			totalQuantity += product.quantity;
		});
		return totalQuantity;
	};

	vm.completeOrder = function () {
		cartService.completeOrder(vm.cart);
	};
}
